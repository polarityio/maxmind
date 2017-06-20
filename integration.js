'use strict';

let _ = require('lodash');
let async = require('async');
let config = require('./config/config');
let path = require('path');
let maxmind = require('maxmind');
let ipaddr = require('ipaddr.js');

let Logger;
let cityLookup = null;
let asnLookup = null;
let startupErr = null;


function startup(logger) {
    Logger = logger;
    maxmind.open('database/GeoLite2-City.mmdb', (err, lookup) => {
        if(err){
            startupErr = err;
        }else{
            cityLookup = lookup;
        }
    });

    maxmind.open('database/GeoLite2-ASN.mmdb', (err, lookup) => {
        if(err){
            startupErr = err;
        }else{
            asnLookup = lookup;
        }
    });
}

function doLookup(entities, options, cb) {
    let lookupResults = [];

    if(startupErr){
        Logger.error({startupError: startupErr}, 'Error loading maxmind databases');
        cb(startupErr);
        startupErr = null;
        return;
    }

    if(asnLookup === null || cityLookup === null){
        // can't do lookup yet because we are still loading the databases
        // or there was an error
        Logger.warn('asnLookup or cityLookup database is null');
        cb(null, []);
        return;
    }

    async.each(entities, function (entity, next) {
        _lookupIp(entity, options, function (err, result) {
            if (err) {
                next(err);
                return;
            }

            lookupResults.push(result);
            next(null);
        });
    }, function (err) {
        if (err) {
            cb(err);
        } else {
            cb(null, lookupResults);
        }
    });
}

function _getNetworkAddress(address, routingPrefix)
{
    let bytes = ipaddr.parse(address).toByteArray();
    for (let i = routingPrefix; i < bytes.length * 8; ++i)
    {
        bytes[Math.floor(i / 8)] &= ~(0x80 >> (i % 8));
    }

    let network = ipaddr.fromByteArray(bytes).toString() + "/" + routingPrefix;
    Logger.info({address: address, routingPrefix: routingPrefix, bytes:bytes, network:network}, 'Bytes');
    return network;
}

function _lookupIp(entityObj, options, cb) {
    let cityData = cityLookup.getWithRoutingPrefix(entityObj.value);
    let asnData = asnLookup.getWithRoutingPrefix(entityObj.value);

    Logger.info({maxmindCityResult: cityData}, 'City Data');
    Logger.info({maxmindAsnResult: asnData}, 'ASN Data');

    if (cityData) {
        cityData.asn = asnData;
        //let ip = new ipaddr.IPv4(entityObj.value);
        //Logger.info({ip:ipaddr.IPv4.subnetMaskFromPrefixLength(entityObj.value)}, 'IP');
        //cityData.network = ipaddr.IPv4.networkAddressFromCIDR(entityObj.value + "/" + cityData.routingPrefix);
        cityData.network = _getNetworkAddress(entityObj.value, cityData.routingPrefix);

        cb(null, {
            // Required: This is the entity object passed into the integration doLookup method
            entity: entityObj,
            // Required: An object containing everything you want passed to the template
            data: {
                // Required: These are the tags that are displayed in your template
                summary: _getSummaryTags(cityData),
                // Data that you want to pass back to the notification window details block
                details: cityData
            }
        });
    } else {
        cb(null, {
            entity: entityObj,
            data: null
        });
    }
}

function _getSummaryTags(data) {
    let summaryTags = [];

    if(data.traits && data.traits.is_anonymous_proxy){
        summaryTags.push('<i class="critical-bold fa fa-user-secret"></i>');
    }

    if(data.traits && data.traits.is_satellite_provider){
        summaryTags.push('<i class="critical-bold bts bt-rocket"></i>');
    }

    return summaryTags;
}

// function validateOptions(userOptions, cb) {
//     let errors = [];
//
//     if (typeof userOptions.apiKey.value !== 'string' ||
//         (typeof userOptions.apiKey.value === 'string' && userOptions.apiKey.value.length === 0)) {
//         errors.push({
//             key: 'apiKey',
//             message: 'You must provide a Carbon Black API key'
//         })
//     }
//
//     if (typeof userOptions.url.value !== 'string' ||
//         (typeof userOptions.url.value === 'string' && userOptions.url.value.length === 0)) {
//         errors.push({
//             key: 'url',
//             message: 'You must provide a Carbon Black URL'
//         })
//     }
//
//     cb(null, errors);
// }


module.exports = {
    doLookup: doLookup,
    startup: startup,
    //validateOptions: validateOptions
};