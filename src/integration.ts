'use strict';
import * as config from '../config/config.json';
import maxmind, { CityResponse, AsnResponse, Reader } from 'maxmind';

import { ExtendedCityResponse, Options, maxmindResult as Result } from './types';
import { Entity, Channel, Logger, IntegrationError, MetaObject, ValidationError } from 'polarity-integration-utils';
import { IntegrationContext as Context } from 'polarity-integration-utils/context';
import * as path from 'path';

let cityLookup: Reader<CityResponse>;
let asnLookup: Reader<AsnResponse>;

// Get the directory of this compiled file and resolve database paths relative to project root
const getProjectRoot = () => {
  // When compiled, this file will be in dist/, so go up one level to project root
  // __dirname will point to dist/ when running the compiled code
  return path.resolve(__dirname, '..');
};

const DEFAULT_ASN_PATH = path.join(getProjectRoot(), 'database', 'GeoLite2-ASN.mmdb');
const DEFAULT_CITY_PATH = path.join(getProjectRoot(), 'database', 'GeoLite2-City.mmdb');

// function startup(logger: logger) {
//   logger.info("Fakelarity startup function called");

//   const customlogger = {
//     info: (...args) => console.log("[FAKELARITY]", "[INFO]", ...args),
//     warn: (...args) => console.log("[FAKELARITY]", "[WARN]", ...args),
//     error: (...args) => console.log("[FAKELARITY]", "[ERROR]", ...args),
//     debug: (...args) => console.log("[FAKELARITY]", "[DEBUG]", ...args),
//     trace: (...args) => console.log("[FAKELARITY]", "[TRACE]", ...args),
//   };

//   customlogger.info("Custom logger initialized successfully");
//   return { logger: customlogger };
// }

async function maybeLoadDatabases(options: Options, context: Context) {
  const { cache } = context;
  const { logger } = context;

  // Handle city database path
  if (typeof options.pathToCityDatabase === 'string' && options.pathToCityDatabase.trim().length === 0) {
    options.pathToCityDatabase = DEFAULT_CITY_PATH;
  } else if (typeof options.pathToCityDatabase === 'string' && !path.isAbsolute(options.pathToCityDatabase)) {
    // If it's a relative path, resolve it relative to the project root
    options.pathToCityDatabase = path.join(getProjectRoot(), options.pathToCityDatabase);
  }

  // Handle ASN database path
  if (typeof options.pathToAsnDatabase === 'string' && options.pathToAsnDatabase.trim().length === 0) {
    options.pathToAsnDatabase = DEFAULT_ASN_PATH;
  } else if (typeof options.pathToAsnDatabase === 'string' && !path.isAbsolute(options.pathToAsnDatabase)) {
    // If it's a relative path, resolve it relative to the project root
    options.pathToAsnDatabase = path.join(getProjectRoot(), options.pathToAsnDatabase);
  }

  if (
    (await cache.integration.get('CityPath')) !== options.pathToCityDatabase ||
    (await cache.integration.get('AsnPath')) !== options.pathToAsnDatabase ||
    cityLookup === null ||
    asnLookup === null
  ) {
    logger.debug(
      { cityPath: options.pathToCityDatabase, asnPath: options.pathToAsnDatabase },
      'Loading maxmind database'
    );
    await cache.integration.set('CityPath', options.pathToCityDatabase);
    await cache.integration.set('AsnPath', options.pathToAsnDatabase);
    cityLookup = await maxmind.open(options.pathToCityDatabase);
    asnLookup = await maxmind.open(options.pathToAsnDatabase);
  }
}

const parseErrorToReadableJSON = (error: any) => JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));

async function doLookup(entities: Entity[], options: Options, context: Context) {
  let lookupResults: Result[] = [];
  const { logger } = context;
  logger.debug({ entities, options }, 'doLookup');

  try {
    await maybeLoadDatabases(options, context);
  } catch (dbLoadError) {
    logger.error({ dbLoadError }, 'Error loading maxmind database');
    throw dbLoadError;
  }

  logger.trace({ entities, options }, 'doLookup');

  if (asnLookup === null || cityLookup === null) {
    // can't do lookup yet because we are still loading the databases
    // or there was an error
    logger.warn('asnLookup or cityLookup database is null');
    return;
  }

  let countryBlacklist = _createBlacklistLookup(options);
  let countryWhitelist = _createWhitelistLookup(options);

  try {
    // Process entities synchronously since database lookups are synchronous
    lookupResults = entities
      .filter((entity) => {
        if (maxmind.validate(entity.value)) {
          return true;
        } else {
          // For invalid entities, log and skip
          logger.debug({ entity: entity.value }, 'Skipping invalid IP address');
          return false;
        }
      })
      .map((entity) => {
        try {
          return _lookupIp(entity, countryBlacklist, countryWhitelist, options, context);
        } catch (err) {
          logger.error({ error: err, entity: entity.value }, 'Error processing entity');
          throw err;
        }
      })
      .filter((result): result is Result => result !== null);

    return lookupResults;
  } catch (err) {
    throw err;
  }
}

function _createWhitelistLookup(options: Options): Set<string> {
  let whitelist = new Set<string>();
  options.countryWhitelist.forEach((country: { value: string }) => {
    whitelist.add(country.value);
  });
  return whitelist;
}

function _createBlacklistLookup(options: Options): Set<string> {
  let blacklist = new Set<string>();
  options.countryBlacklist.forEach((country: { value: string }) => {
    blacklist.add(country.value);
  });
  return blacklist;
}

function isCountryFiltered(
  countryIsoCode: string,
  countryBlacklist: Set<string>,
  countryWhitelist: Set<string>,
  entity: Entity,
  options: Options
) {
  if (options.fullResultsForOnDemand && entity.requestContext.requestType === 'onDemand') {
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

function _getCountryCode(cityData: CityResponse) {
  if (cityData && cityData.country && cityData.country.iso_code) {
    return cityData.country.iso_code;
  }
  if (cityData && cityData.registered_country && cityData.registered_country.iso_code) {
    return cityData.registered_country.iso_code;
  }

  // the code O1 stands for other country
  return 'O1';
}

function _lookupIp(
  entityObj: Entity,
  countryBlacklist: Set<string>,
  countryWhitelist: Set<string>,
  options: Options,
  context: Context
): Result | null {
  let cityData = cityLookup.get(entityObj.value);
  let asnData = asnLookup.get(entityObj.value);
  const { logger } = context;

  logger.debug({ maxmindCityResult: cityData }, 'City Data');
  logger.debug({ maxmindAsnResult: asnData }, 'ASN Data');

  if (cityData === null) {
    logger.debug({ entity: entityObj.value }, 'No geolocation data found for this IP address');
    return null;
  }

  const countryCode = _getCountryCode(cityData);

  logger.trace({ isoCode: countryCode }, 'Checking data isocode');
  if (!isCountryFiltered(countryCode, countryBlacklist, countryWhitelist, entityObj, options)) {
    const extendedCityData: ExtendedCityResponse = { ...cityData, asn: asnData };
    logger.trace({ cityData: extendedCityData }, 'Checking city data');
    return {
      // Required: This is the entity object passed into the integration doLookup method
      entity: entityObj,
      displayValue: entityObj.displayValue,
      // Required: An object containing everything you want passed to the template
      data: {
        // Required: These are the tags that are displayed in your template
        summary: [],
        // Data that you want to pass back to the notification window details block
        details: extendedCityData
      }
    };
  } else {
    // ignore the country because it is being filtered
    logger.debug({ entity: entityObj.value, countryCode }, 'Country is filtered by blacklist/whitelist settings');
    return null;
  }
}

function validateOptions(userOptions: Options, context: Context) {
  let errors = [];

  if (
    Array.isArray(userOptions.countryWhitelist) &&
    userOptions.countryWhitelist.length > 0 &&
    Array.isArray(userOptions.countryBlacklist) &&
    userOptions.countryBlacklist.length > 0
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

  // return errors;
  return [
    {
      key: 'countryWhitelist',
      message: 'failing to test js file changes'
    }
  ];
}

export { doLookup, validateOptions };
