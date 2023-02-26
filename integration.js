'use strict';

const async = require('async');
const config = require('./config/config');
const maxmind = require('maxmind');

let Logger;
let cityLookup = null;
let asnLookup = null;

function startup(logger) {
  Logger = logger;

  return async function (cb) {
    try {
      cityLookup = await maxmind.open(config.settings.geoLite2CityDatabasePath);
      asnLookup = await maxmind.open(config.settings.geoLite2AsnDatabasePath);
      Logger.info('Loaded databases');
      cb(null);
    } catch (error) {
      Logger.error(error, 'Error loading maxmind databases');
      cb(parseErrorToReadableJSON(error));
    }
  };
}

const parseErrorToReadableJSON = (error) => JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));

function doLookup(entities, options, cb) {
  let lookupResults = [];

  Logger.trace({ entities, options }, 'doLookup');

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
    function (entity, next) {
      if (maxmind.validate(entity.value)) {
        _lookupIp(entity, countryBlacklist, countryWhitelist, options, function (err, result) {
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
    function (err) {
      if (err) {
        cb(err);
      } else {
        cb(null, lookupResults);
      }
    }
  );
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

function isCountryFiltered(countryIsoCode, countryBlacklist, countryWhitelist, entity, options) {
  if (options.fullResultsForOnDemand && entity.requestContext.requestType === 'OnDemand') {
    return false;
  }

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

function _lookupIp(entityObj, countryBlacklist, countryWhitelist, options, cb) {
  let cityData = cityLookup.get(entityObj.value);
  let asnData = asnLookup.get(entityObj.value);

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
  if (!isCountryFiltered(countryCode, countryBlacklist, countryWhitelist, entityObj, options)) {
    cityData.asn = asnData;
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
