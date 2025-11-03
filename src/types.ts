import { AsnResponse, CityResponse } from 'maxmind';
import { Entity, Result } from 'polarity-integration-utils';

export type Options = {
  countryBlacklist: { value: string; display: string }[];
  countryWhitelist: { value: string; display: string }[];
  fullResultsForOnDemand: boolean;
  showFullCountryName: boolean;
  showState: boolean;
  showAsnTag: boolean;
  pathToCityDatabase: string;
  pathToAsnDatabase: string;
};

export interface ExtendedCityResponse extends CityResponse {
  asn?: AsnResponse | null;
}

export type maxmindResult = Result<ExtendedCityResponse>;
