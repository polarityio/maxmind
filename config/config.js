module.exports = {
  /**
   * Name of the integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @required
   */
  name: 'MaxMind',
  /**
   * The acronym that appears in the notification window when information from this integration
   * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
   * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
   * here will be carried forward into the notification window.
   *
   * @type String
   * @required
   */
  acronym: 'MM',
  logging: { level: 'info' },
  entityTypes: ['IPv4', 'IPv6'],
  /**
   * Description for this integration which is displayed in the Polarity integrations user interface
   *
   * @type String
   * @optional
   */
  description: 'Polarity integration that connects to the MaxMind GeoLite2 database.',
  /**
   * An array of style files (css or less) that will be included for your integration. Any styles specified in
   * the below files can be used in your custom template.
   *
   * @type Array
   * @optional
   */
  styles: ['./styles/maxmind.less'],
  /**
   * Provide custom component logic and template for rendering the integration details block.  If you do not
   * provide a custom template and/or component then the integration will display data as a table of key value
   * pairs.
   *
   * @type Object
   * @optional
   */
  block: {
    component: {
      file: './components/maxmind-block.js'
    },
    template: {
      file: './templates/maxmind-block.hbs'
    }
  },
  summary: {
    component: {
      file: './components/maxmind-summary.js'
    },
    template: {
      file: './templates/maxmind-summary.hbs'
    }
  },
  integrationBlock: {
    file: './block/maxmind.js'
  },
  settings: {
    /**
     * Directory path to the GeoLiteCity 2 database.  If a relative path is chosen, the path will be relative
     * to this integration's root directory.  The GeoLite2-City database can be downloaded from:
     * https://dev.maxmind.com/geoip/geoip2/geolite2/
     */
    geoLite2CityDatabasePath: 'database/GeoLite2-City.mmdb',
    /**
     * Directory path to the GeoLiteASN 2 database. If a relative path is chosen, the path will be relative
     * to this integration's root directory.  The GeoLite2-ASN database can be downloaded from:
     * https://dev.maxmind.com/geoip/geoip2/geolite2/
     */
    geoLite2AsnDatabasePath: 'database/GeoLite2-ASN.mmdb'
  },
  /**
   * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
   * as an array of option objects.
   *
   * @type Array
   * @optional
   */
  options: [
    {
      key: 'showFullCountryName',
      name: 'Show Full Country Name',
      description:
        'If checked, integration will always display the full country name rather than just the country ISO Code in the MaxMind notification summary',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'showState',
      name: 'Show State',
      description:
        'If checked, the integration will display the state or subdivision information when available in the MaxMind notification summary',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'showAsnTag',
      name: 'Show ASN and Org Info as Tag',
      description: 'If checked, the integration will display the ASN and organization information as a summary tag',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'filter',
      name: 'Restrict search to a single country ',
      description: 'If checked, Polarity will only return information based on a single country code',
      default: false,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'countryCodes',
      name: 'Country code to restrict maxmind searching to',
      description: 'Single country code (ex.. "RU" for Russia) to limit maxmind searching to, for more information on Maxmind country codes please visit: https://dev.maxmind.com/geoip/legacy/codes/iso3166/',
      default: '',
      type: 'text',
      userCanEdit: true,
      adminOnly: false
    }
  ]
};
