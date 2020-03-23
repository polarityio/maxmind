'use strict';

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

  maxmind.open(config.settings.geoLite2CityDatabasePath, (err, lookup) => {
    if (err) {
      startupErr = err;
    } else {
      cityLookup = lookup;
    }
  });

  maxmind.open(config.settings.geoLite2AsnDatabasePath, (err, lookup) => {
    if (err) {
      startupErr = err;
    } else {
      asnLookup = lookup;
    }
  });
}

function doLookup(entities, options, cb) {
  let lookupResults = [];

  if (startupErr) {
    Logger.error({ startupError: startupErr }, 'Error loading maxmind databases');
    cb(startupErr);
    startupErr = null;
    return;
  }

  if (asnLookup === null || cityLookup === null) {
    // can't do lookup yet because we are still loading the databases
    // or there was an error
    Logger.warn('asnLookup or cityLookup database is null');
    cb(null, []);
    return;
  }

  let countryBlacklist = _createBlacklistLookup(options);
  let countryWhitelist = _createWhitelistLookup(options);

  async.each(
    entities,
    function(entity, next) {
      if (ipaddr.isValid(entity.value)) {
        _lookupIp(entity, countryBlacklist, countryWhitelist, function(err, result) {
          if (err) {
            next(err);
            return;
          }

          if (result) {
            lookupResults.push(result);
          }

          next(null);
        });
      } else {
        next(null);
      }
    },
    function(err) {
      if (err) {
        cb(err);
      } else {
        cb(null, lookupResults);
      }
    }
  );
}

/**
 * Given an IP address and routingPrefix returns the CIDR network for that IP.
 *
 * @param address
 * @param routingPrefix
 * @returns {string}
 * @private
 */
function _getNetworkAddress(address, routingPrefix) {
  let bytes = ipaddr.parse(address).toByteArray();
  for (let i = routingPrefix; i < bytes.length * 8; ++i) {
    bytes[Math.floor(i / 8)] &= ~(0x80 >> i % 8);
  }

  let network = ipaddr.fromByteArray(bytes).toString() + '/' + routingPrefix;
  Logger.debug({ address: address, routingPrefix: routingPrefix, bytes: bytes, network: network }, 'Bytes');

  return network;
}

function _createWhitelistLookup(options) {
  let whitelist = new Set();
  options.countryWhitelist.forEach((country) => {
    whitelist.add(country.value);
  });
  return whitelist;
}

function _createBlacklistLookup(options) {
  let blacklist = new Set();
  options.countryBlacklist.forEach((country) => {
    blacklist.add(country.value);
  });
  return blacklist;
}

function isCountryFiltered(countryIsoCode, countryBlacklist, countryWhitelist) {
  if (countryBlacklist.size > 0 && countryBlacklist.has(countryIsoCode)) {
    // the blacklist is being implemented and this country is blacklisted
    return true;
  } else if (countryWhitelist.size > 0 && !countryWhitelist.has(countryIsoCode)) {
    // the whitelist is in effect and this country is not whitelisted
    return true;
  }

  return false;
}

function _getCountryCode(cityData) {
  if (cityData && cityData.country && cityData.country.iso_code) {
    return cityData.country.iso_code;
  }
  if (cityData && cityData.registered_country && cityData.registered_country.iso_code) {
    return cityData.registered_country.iso_code;
  }

  // the code O1 stands for other country
  return 'O1';
}

function _lookupIp(entityObj, countryBlacklist, countryWhitelist, cb) {
  let cityData = cityLookup.getWithRoutingPrefix(entityObj.value);
  let asnData = asnLookup.getWithRoutingPrefix(entityObj.value);

  Logger.debug({ maxmindCityResult: cityData }, 'City Data');
  Logger.debug({ maxmindAsnResult: asnData }, 'ASN Data');

  if (cityData === null) {
    return cb(null, {
      entity: entityObj,
      data: null
    });
  }

  const countryCode = _getCountryCode(cityData);

  Logger.trace({ isoCode: countryCode }, 'Checking data isocode');
  if (!isCountryFiltered(countryCode, countryBlacklist, countryWhitelist)) {
    cityData.asn = asnData;
    cityData.network = _getNetworkAddress(entityObj.value, cityData.routingPrefix);
    Logger.trace({ cityData: cityData }, 'Checking city data');
    cb(null, {
      // Required: This is the entity object passed into the integration doLookup method
      entity: entityObj,
      // Required: An object containing everything you want passed to the template
      data: {
        // Required: These are the tags that are displayed in your template
        summary: [],
        // Data that you want to pass back to the notification window details block
        details: cityData
      }
    });
  } else {
    // ignore the country because it is being filtered
    cb(null);
  }
}

function validateOptions(userOptions, cb) {
  let errors = [];

  if (
    Array.isArray(userOptions.countryWhitelist.value) &&
    userOptions.countryWhitelist.value.length > 0 &&
    Array.isArray(userOptions.countryBlacklist.value) &&
    userOptions.countryBlacklist.value.length > 0
  ) {
    errors.push({
      key: 'countryWhitelist',
      message: 'You cannot provide both a "Country Whitelist" and a "Country Blacklist".'
    });
    errors.push({
      key: 'countryBlacklist',
      message: 'You cannot provide both a "Country Blacklist" and a "Country Whitelist".'
    });
  }

  cb(null, errors);
}

module.exports = {
  doLookup: doLookup,
  startup: startup,
  validateOptions: validateOptions
};
