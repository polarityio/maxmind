module.exports = {
  name: 'MaxMind',
  acronym: 'MM',
  logging: {
    level: 'info'
  },
  entityTypes: ['IPv4', 'IPv6'],
  description: 'Polarity integration that connects to the MaxMind GeoLite2 database.',
  styles: ['./styles/maxmind.less'],
  defaultColor: 'light-gray',
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
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ''
  },
  options: [
    {
      key: 'countryBlacklist',
      name: 'Country Block List',
      description:
        'A block list of countries to hide results from (i.e., no results will be shown for selected countries).  You cannot provide both a Country Blacklist and a Country Whitelist.',
      default: [],
      type: 'select',
      options: [
        {
          value: 'AD',
          display: 'Andorra'
        },
        {
          value: 'AE',
          display: 'United Arab Emirates'
        },
        {
          value: 'AF',
          display: 'Afghanistan'
        },
        {
          value: 'AG',
          display: 'Antigua and Barbuda'
        },
        {
          value: 'AI',
          display: 'Anguilla'
        },
        {
          value: 'AL',
          display: 'Albania'
        },
        {
          value: 'AM',
          display: 'Armenia'
        },
        {
          value: 'AO',
          display: 'Angola'
        },
        {
          value: 'AP',
          display: 'Asia/Pacific Region'
        },
        {
          value: 'AQ',
          display: 'Antarctica'
        },
        {
          value: 'AR',
          display: 'Argentina'
        },
        {
          value: 'AS',
          display: 'American Samoa'
        },
        {
          value: 'AT',
          display: 'Austria'
        },
        {
          value: 'AU',
          display: 'Australia'
        },
        {
          value: 'AW',
          display: 'Aruba'
        },
        {
          value: 'AX',
          display: 'Aland Islands'
        },
        {
          value: 'AZ',
          display: 'Azerbaijan'
        },
        {
          value: 'BA',
          display: 'Bosnia and Herzegovina'
        },
        {
          value: 'BB',
          display: 'Barbados'
        },
        {
          value: 'BD',
          display: 'Bangladesh'
        },
        {
          value: 'BE',
          display: 'Belgium'
        },
        {
          value: 'BF',
          display: 'Burkina Faso'
        },
        {
          value: 'BG',
          display: 'Bulgaria'
        },
        {
          value: 'BH',
          display: 'Bahrain'
        },
        {
          value: 'BI',
          display: 'Burundi'
        },
        {
          value: 'BJ',
          display: 'Benin'
        },
        {
          value: 'BL',
          display: 'Saint Barthelemey'
        },
        {
          value: 'BM',
          display: 'Bermuda'
        },
        {
          value: 'BN',
          display: 'Brunei Darussalam'
        },
        {
          value: 'BO',
          display: 'Bolivia'
        },
        {
          value: 'BQ',
          display: 'Bonaire, Saint Eustatius and Saba'
        },
        {
          value: 'BR',
          display: 'Brazil'
        },
        {
          value: 'BS',
          display: 'Bahamas'
        },
        {
          value: 'BT',
          display: 'Bhutan'
        },
        {
          value: 'BV',
          display: 'Bouvet Island'
        },
        {
          value: 'BW',
          display: 'Botswana'
        },
        {
          value: 'BY',
          display: 'Belarus'
        },
        {
          value: 'BZ',
          display: 'Belize'
        },
        {
          value: 'CA',
          display: 'Canada'
        },
        {
          value: 'CC',
          display: 'Cocos (Keeling) Islands'
        },
        {
          value: 'CD',
          display: 'Congo, The Democratic Republic of the'
        },
        {
          value: 'CF',
          display: 'Central African Republic'
        },
        {
          value: 'CG',
          display: 'Congo'
        },
        {
          value: 'CH',
          display: 'Switzerland'
        },
        {
          value: 'CI',
          display: "Cote d'Ivoire"
        },
        {
          value: 'CK',
          display: 'Cook Islands'
        },
        {
          value: 'CL',
          display: 'Chile'
        },
        {
          value: 'CM',
          display: 'Cameroon'
        },
        {
          value: 'CN',
          display: 'China'
        },
        {
          value: 'CO',
          display: 'Colombia'
        },
        {
          value: 'CR',
          display: 'Costa Rica'
        },
        {
          value: 'CU',
          display: 'Cuba'
        },
        {
          value: 'CV',
          display: 'Cape Verde'
        },
        {
          value: 'CW',
          display: 'Curacao'
        },
        {
          value: 'CX',
          display: 'Christmas Island'
        },
        {
          value: 'CY',
          display: 'Cyprus'
        },
        {
          value: 'CZ',
          display: 'Czech Republic'
        },
        {
          value: 'DE',
          display: 'Germany'
        },
        {
          value: 'DJ',
          display: 'Djibouti'
        },
        {
          value: 'DK',
          display: 'Denmark'
        },
        {
          value: 'DM',
          display: 'Dominica'
        },
        {
          value: 'DO',
          display: 'Dominican Republic'
        },
        {
          value: 'DZ',
          display: 'Algeria'
        },
        {
          value: 'EC',
          display: 'Ecuador'
        },
        {
          value: 'EE',
          display: 'Estonia'
        },
        {
          value: 'EG',
          display: 'Egypt'
        },
        {
          value: 'EH',
          display: 'Western Sahara'
        },
        {
          value: 'ER',
          display: 'Eritrea'
        },
        {
          value: 'ES',
          display: 'Spain'
        },
        {
          value: 'ET',
          display: 'Ethiopia'
        },
        {
          value: 'EU',
          display: 'Europe'
        },
        {
          value: 'FI',
          display: 'Finland'
        },
        {
          value: 'FJ',
          display: 'Fiji'
        },
        {
          value: 'FK',
          display: 'Falkland Islands (Malvinas)'
        },
        {
          value: 'FM',
          display: 'Micronesia, Federated States of'
        },
        {
          value: 'FO',
          display: 'Faroe Islands'
        },
        {
          value: 'FR',
          display: 'France'
        },
        {
          value: 'GA',
          display: 'Gabon'
        },
        {
          value: 'GB',
          display: 'United Kingdom'
        },
        {
          value: 'GD',
          display: 'Grenada'
        },
        {
          value: 'GE',
          display: 'Georgia'
        },
        {
          value: 'GF',
          display: 'French Guiana'
        },
        {
          value: 'GG',
          display: 'Guernsey'
        },
        {
          value: 'GH',
          display: 'Ghana'
        },
        {
          value: 'GI',
          display: 'Gibraltar'
        },
        {
          value: 'GL',
          display: 'Greenland'
        },
        {
          value: 'GM',
          display: 'Gambia'
        },
        {
          value: 'GN',
          display: 'Guinea'
        },
        {
          value: 'GP',
          display: 'Guadeloupe'
        },
        {
          value: 'GQ',
          display: 'Equatorial Guinea'
        },
        {
          value: 'GR',
          display: 'Greece'
        },
        {
          value: 'GS',
          display: 'South Georgia and the South Sandwich Islands'
        },
        {
          value: 'GT',
          display: 'Guatemala'
        },
        {
          value: 'GU',
          display: 'Guam'
        },
        {
          value: 'GW',
          display: 'Guinea-Bissau'
        },
        {
          value: 'GY',
          display: 'Guyana'
        },
        {
          value: 'HK',
          display: 'Hong Kong'
        },
        {
          value: 'HM',
          display: 'Heard Island and McDonald Islands'
        },
        {
          value: 'HN',
          display: 'Honduras'
        },
        {
          value: 'HR',
          display: 'Croatia'
        },
        {
          value: 'HT',
          display: 'Haiti'
        },
        {
          value: 'HU',
          display: 'Hungary'
        },
        {
          value: 'ID',
          display: 'Indonesia'
        },
        {
          value: 'IE',
          display: 'Ireland'
        },
        {
          value: 'IL',
          display: 'Israel'
        },
        {
          value: 'IM',
          display: 'Isle of Man'
        },
        {
          value: 'IN',
          display: 'India'
        },
        {
          value: 'IO',
          display: 'British Indian Ocean Territory'
        },
        {
          value: 'IQ',
          display: 'Iraq'
        },
        {
          value: 'IR',
          display: 'Iran, Islamic Republic of'
        },
        {
          value: 'IS',
          display: 'Iceland'
        },
        {
          value: 'IT',
          display: 'Italy'
        },
        {
          value: 'JE',
          display: 'Jersey'
        },
        {
          value: 'JM',
          display: 'Jamaica'
        },
        {
          value: 'JO',
          display: 'Jordan'
        },
        {
          value: 'JP',
          display: 'Japan'
        },
        {
          value: 'KE',
          display: 'Kenya'
        },
        {
          value: 'KG',
          display: 'Kyrgyzstan'
        },
        {
          value: 'KH',
          display: 'Cambodia'
        },
        {
          value: 'KI',
          display: 'Kiribati'
        },
        {
          value: 'KM',
          display: 'Comoros'
        },
        {
          value: 'KN',
          display: 'Saint Kitts and Nevis'
        },
        {
          value: 'KP',
          display: "Korea, Democratic People's Republic of"
        },
        {
          value: 'KR',
          display: 'Korea, Republic of'
        },
        {
          value: 'KW',
          display: 'Kuwait'
        },
        {
          value: 'KY',
          display: 'Cayman Islands'
        },
        {
          value: 'KZ',
          display: 'Kazakhstan'
        },
        {
          value: 'LA',
          display: "Lao People's Democratic Republic"
        },
        {
          value: 'LB',
          display: 'Lebanon'
        },
        {
          value: 'LC',
          display: 'Saint Lucia'
        },
        {
          value: 'LI',
          display: 'Liechtenstein'
        },
        {
          value: 'LK',
          display: 'Sri Lanka'
        },
        {
          value: 'LR',
          display: 'Liberia'
        },
        {
          value: 'LS',
          display: 'Lesotho'
        },
        {
          value: 'LT',
          display: 'Lithuania'
        },
        {
          value: 'LU',
          display: 'Luxembourg'
        },
        {
          value: 'LV',
          display: 'Latvia'
        },
        {
          value: 'LY',
          display: 'Libyan Arab Jamahiriya'
        },
        {
          value: 'MA',
          display: 'Morocco'
        },
        {
          value: 'MC',
          display: 'Monaco'
        },
        {
          value: 'MD',
          display: 'Moldova, Republic of'
        },
        {
          value: 'ME',
          display: 'Montenegro'
        },
        {
          value: 'MF',
          display: 'Saint Martin'
        },
        {
          value: 'MG',
          display: 'Madagascar'
        },
        {
          value: 'MH',
          display: 'Marshall Islands'
        },
        {
          value: 'MK',
          display: 'Macedonia'
        },
        {
          value: 'ML',
          display: 'Mali'
        },
        {
          value: 'MM',
          display: 'Myanmar'
        },
        {
          value: 'MN',
          display: 'Mongolia'
        },
        {
          value: 'MO',
          display: 'Macao'
        },
        {
          value: 'MP',
          display: 'Northern Mariana Islands'
        },
        {
          value: 'MQ',
          display: 'Martinique'
        },
        {
          value: 'MR',
          display: 'Mauritania'
        },
        {
          value: 'MS',
          display: 'Montserrat'
        },
        {
          value: 'MT',
          display: 'Malta'
        },
        {
          value: 'MU',
          display: 'Mauritius'
        },
        {
          value: 'MV',
          display: 'Maldives'
        },
        {
          value: 'MW',
          display: 'Malawi'
        },
        {
          value: 'MX',
          display: 'Mexico'
        },
        {
          value: 'MY',
          display: 'Malaysia'
        },
        {
          value: 'MZ',
          display: 'Mozambique'
        },
        {
          value: 'NA',
          display: 'Namibia'
        },
        {
          value: 'NC',
          display: 'New Caledonia'
        },
        {
          value: 'NE',
          display: 'Niger'
        },
        {
          value: 'NF',
          display: 'Norfolk Island'
        },
        {
          value: 'NG',
          display: 'Nigeria'
        },
        {
          value: 'NI',
          display: 'Nicaragua'
        },
        {
          value: 'NL',
          display: 'Netherlands'
        },
        {
          value: 'NO',
          display: 'Norway'
        },
        {
          value: 'NP',
          display: 'Nepal'
        },
        {
          value: 'NR',
          display: 'Nauru'
        },
        {
          value: 'NU',
          display: 'Niue'
        },
        {
          value: 'NZ',
          display: 'New Zealand'
        },
        {
          value: 'OM',
          display: 'Oman'
        },
        {
          value: 'PA',
          display: 'Panama'
        },
        {
          value: 'PE',
          display: 'Peru'
        },
        {
          value: 'PF',
          display: 'French Polynesia'
        },
        {
          value: 'PG',
          display: 'Papua New Guinea'
        },
        {
          value: 'PH',
          display: 'Philippines'
        },
        {
          value: 'PK',
          display: 'Pakistan'
        },
        {
          value: 'PL',
          display: 'Poland'
        },
        {
          value: 'PM',
          display: 'Saint Pierre and Miquelon'
        },
        {
          value: 'PN',
          display: 'Pitcairn'
        },
        {
          value: 'PR',
          display: 'Puerto Rico'
        },
        {
          value: 'PS',
          display: 'Palestinian Territory'
        },
        {
          value: 'PT',
          display: 'Portugal'
        },
        {
          value: 'PW',
          display: 'Palau'
        },
        {
          value: 'PY',
          display: 'Paraguay'
        },
        {
          value: 'QA',
          display: 'Qatar'
        },
        {
          value: 'RE',
          display: 'Reunion'
        },
        {
          value: 'RO',
          display: 'Romania'
        },
        {
          value: 'RS',
          display: 'Serbia'
        },
        {
          value: 'RU',
          display: 'Russian Federation'
        },
        {
          value: 'RW',
          display: 'Rwanda'
        },
        {
          value: 'SA',
          display: 'Saudi Arabia'
        },
        {
          value: 'SB',
          display: 'Solomon Islands'
        },
        {
          value: 'SC',
          display: 'Seychelles'
        },
        {
          value: 'SD',
          display: 'Sudan'
        },
        {
          value: 'SE',
          display: 'Sweden'
        },
        {
          value: 'SG',
          display: 'Singapore'
        },
        {
          value: 'SH',
          display: 'Saint Helena'
        },
        {
          value: 'SI',
          display: 'Slovenia'
        },
        {
          value: 'SJ',
          display: 'Svalbard and Jan Mayen'
        },
        {
          value: 'SK',
          display: 'Slovakia'
        },
        {
          value: 'SL',
          display: 'Sierra Leone'
        },
        {
          value: 'SM',
          display: 'San Marino'
        },
        {
          value: 'SN',
          display: 'Senegal'
        },
        {
          value: 'SO',
          display: 'Somalia'
        },
        {
          value: 'SR',
          display: 'Suriname'
        },
        {
          value: 'SS',
          display: 'South Sudan'
        },
        {
          value: 'ST',
          display: 'Sao Tome and Principe'
        },
        {
          value: 'SV',
          display: 'El Salvador'
        },
        {
          value: 'SX',
          display: 'Sint Maarten'
        },
        {
          value: 'SY',
          display: 'Syrian Arab Republic'
        },
        {
          value: 'SZ',
          display: 'Swaziland'
        },
        {
          value: 'TC',
          display: 'Turks and Caicos Islands'
        },
        {
          value: 'TD',
          display: 'Chad'
        },
        {
          value: 'TF',
          display: 'French Southern Territories'
        },
        {
          value: 'TG',
          display: 'Togo'
        },
        {
          value: 'TH',
          display: 'Thailand'
        },
        {
          value: 'TJ',
          display: 'Tajikistan'
        },
        {
          value: 'TK',
          display: 'Tokelau'
        },
        {
          value: 'TL',
          display: 'Timor-Leste'
        },
        {
          value: 'TM',
          display: 'Turkmenistan'
        },
        {
          value: 'TN',
          display: 'Tunisia'
        },
        {
          value: 'TO',
          display: 'Tonga'
        },
        {
          value: 'TR',
          display: 'Turkey'
        },
        {
          value: 'TT',
          display: 'Trinidad and Tobago'
        },
        {
          value: 'TV',
          display: 'Tuvalu'
        },
        {
          value: 'TW',
          display: 'Taiwan'
        },
        {
          value: 'TZ',
          display: 'Tanzania, United Republic of'
        },
        {
          value: 'UA',
          display: 'Ukraine'
        },
        {
          value: 'UG',
          display: 'Uganda'
        },
        {
          value: 'UM',
          display: 'United States Minor Outlying Islands'
        },
        {
          value: 'US',
          display: 'United States'
        },
        {
          value: 'UY',
          display: 'Uruguay'
        },
        {
          value: 'UZ',
          display: 'Uzbekistan'
        },
        {
          value: 'VA',
          display: 'Holy See (Vatican City State)'
        },
        {
          value: 'VC',
          display: 'Saint Vincent and the Grenadines'
        },
        {
          value: 'VE',
          display: 'Venezuela'
        },
        {
          value: 'VG',
          display: 'Virgin Islands, British'
        },
        {
          value: 'VI',
          display: 'Virgin Islands, U.S.'
        },
        {
          value: 'VN',
          display: 'Vietnam'
        },
        {
          value: 'VU',
          display: 'Vanuatu'
        },
        {
          value: 'WF',
          display: 'Wallis and Futuna'
        },
        {
          value: 'WS',
          display: 'Samoa'
        },
        {
          value: 'YE',
          display: 'Yemen'
        },
        {
          value: 'YT',
          display: 'Mayotte'
        },
        {
          value: 'ZA',
          display: 'South Africa'
        },
        {
          value: 'ZM',
          display: 'Zambia'
        },
        {
          value: 'ZW',
          display: 'Zimbabwe'
        }
      ],
      multiple: true,
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'countryWhitelist',
      name: 'Country Allow List',
      description:
        'An allow list of countries that results should be shown for (i.e., results will only be shown for selected countries). You cannot provide both a Country Blacklist and a Country Whitelist.',
      default: [],
      type: 'select',
      options: [
        {
          value: 'AD',
          display: 'Andorra'
        },
        {
          value: 'AE',
          display: 'United Arab Emirates'
        },
        {
          value: 'AF',
          display: 'Afghanistan'
        },
        {
          value: 'AG',
          display: 'Antigua and Barbuda'
        },
        {
          value: 'AI',
          display: 'Anguilla'
        },
        {
          value: 'AL',
          display: 'Albania'
        },
        {
          value: 'AM',
          display: 'Armenia'
        },
        {
          value: 'AO',
          display: 'Angola'
        },
        {
          value: 'AP',
          display: 'Asia/Pacific Region'
        },
        {
          value: 'AQ',
          display: 'Antarctica'
        },
        {
          value: 'AR',
          display: 'Argentina'
        },
        {
          value: 'AS',
          display: 'American Samoa'
        },
        {
          value: 'AT',
          display: 'Austria'
        },
        {
          value: 'AU',
          display: 'Australia'
        },
        {
          value: 'AW',
          display: 'Aruba'
        },
        {
          value: 'AX',
          display: 'Aland Islands'
        },
        {
          value: 'AZ',
          display: 'Azerbaijan'
        },
        {
          value: 'BA',
          display: 'Bosnia and Herzegovina'
        },
        {
          value: 'BB',
          display: 'Barbados'
        },
        {
          value: 'BD',
          display: 'Bangladesh'
        },
        {
          value: 'BE',
          display: 'Belgium'
        },
        {
          value: 'BF',
          display: 'Burkina Faso'
        },
        {
          value: 'BG',
          display: 'Bulgaria'
        },
        {
          value: 'BH',
          display: 'Bahrain'
        },
        {
          value: 'BI',
          display: 'Burundi'
        },
        {
          value: 'BJ',
          display: 'Benin'
        },
        {
          value: 'BL',
          display: 'Saint Barthelemey'
        },
        {
          value: 'BM',
          display: 'Bermuda'
        },
        {
          value: 'BN',
          display: 'Brunei Darussalam'
        },
        {
          value: 'BO',
          display: 'Bolivia'
        },
        {
          value: 'BQ',
          display: 'Bonaire, Saint Eustatius and Saba'
        },
        {
          value: 'BR',
          display: 'Brazil'
        },
        {
          value: 'BS',
          display: 'Bahamas'
        },
        {
          value: 'BT',
          display: 'Bhutan'
        },
        {
          value: 'BV',
          display: 'Bouvet Island'
        },
        {
          value: 'BW',
          display: 'Botswana'
        },
        {
          value: 'BY',
          display: 'Belarus'
        },
        {
          value: 'BZ',
          display: 'Belize'
        },
        {
          value: 'CA',
          display: 'Canada'
        },
        {
          value: 'CC',
          display: 'Cocos (Keeling) Islands'
        },
        {
          value: 'CD',
          display: 'Congo, The Democratic Republic of the'
        },
        {
          value: 'CF',
          display: 'Central African Republic'
        },
        {
          value: 'CG',
          display: 'Congo'
        },
        {
          value: 'CH',
          display: 'Switzerland'
        },
        {
          value: 'CI',
          display: "Cote d'Ivoire"
        },
        {
          value: 'CK',
          display: 'Cook Islands'
        },
        {
          value: 'CL',
          display: 'Chile'
        },
        {
          value: 'CM',
          display: 'Cameroon'
        },
        {
          value: 'CN',
          display: 'China'
        },
        {
          value: 'CO',
          display: 'Colombia'
        },
        {
          value: 'CR',
          display: 'Costa Rica'
        },
        {
          value: 'CU',
          display: 'Cuba'
        },
        {
          value: 'CV',
          display: 'Cape Verde'
        },
        {
          value: 'CW',
          display: 'Curacao'
        },
        {
          value: 'CX',
          display: 'Christmas Island'
        },
        {
          value: 'CY',
          display: 'Cyprus'
        },
        {
          value: 'CZ',
          display: 'Czech Republic'
        },
        {
          value: 'DE',
          display: 'Germany'
        },
        {
          value: 'DJ',
          display: 'Djibouti'
        },
        {
          value: 'DK',
          display: 'Denmark'
        },
        {
          value: 'DM',
          display: 'Dominica'
        },
        {
          value: 'DO',
          display: 'Dominican Republic'
        },
        {
          value: 'DZ',
          display: 'Algeria'
        },
        {
          value: 'EC',
          display: 'Ecuador'
        },
        {
          value: 'EE',
          display: 'Estonia'
        },
        {
          value: 'EG',
          display: 'Egypt'
        },
        {
          value: 'EH',
          display: 'Western Sahara'
        },
        {
          value: 'ER',
          display: 'Eritrea'
        },
        {
          value: 'ES',
          display: 'Spain'
        },
        {
          value: 'ET',
          display: 'Ethiopia'
        },
        {
          value: 'EU',
          display: 'Europe'
        },
        {
          value: 'FI',
          display: 'Finland'
        },
        {
          value: 'FJ',
          display: 'Fiji'
        },
        {
          value: 'FK',
          display: 'Falkland Islands (Malvinas)'
        },
        {
          value: 'FM',
          display: 'Micronesia, Federated States of'
        },
        {
          value: 'FO',
          display: 'Faroe Islands'
        },
        {
          value: 'FR',
          display: 'France'
        },
        {
          value: 'GA',
          display: 'Gabon'
        },
        {
          value: 'GB',
          display: 'United Kingdom'
        },
        {
          value: 'GD',
          display: 'Grenada'
        },
        {
          value: 'GE',
          display: 'Georgia'
        },
        {
          value: 'GF',
          display: 'French Guiana'
        },
        {
          value: 'GG',
          display: 'Guernsey'
        },
        {
          value: 'GH',
          display: 'Ghana'
        },
        {
          value: 'GI',
          display: 'Gibraltar'
        },
        {
          value: 'GL',
          display: 'Greenland'
        },
        {
          value: 'GM',
          display: 'Gambia'
        },
        {
          value: 'GN',
          display: 'Guinea'
        },
        {
          value: 'GP',
          display: 'Guadeloupe'
        },
        {
          value: 'GQ',
          display: 'Equatorial Guinea'
        },
        {
          value: 'GR',
          display: 'Greece'
        },
        {
          value: 'GS',
          display: 'South Georgia and the South Sandwich Islands'
        },
        {
          value: 'GT',
          display: 'Guatemala'
        },
        {
          value: 'GU',
          display: 'Guam'
        },
        {
          value: 'GW',
          display: 'Guinea-Bissau'
        },
        {
          value: 'GY',
          display: 'Guyana'
        },
        {
          value: 'HK',
          display: 'Hong Kong'
        },
        {
          value: 'HM',
          display: 'Heard Island and McDonald Islands'
        },
        {
          value: 'HN',
          display: 'Honduras'
        },
        {
          value: 'HR',
          display: 'Croatia'
        },
        {
          value: 'HT',
          display: 'Haiti'
        },
        {
          value: 'HU',
          display: 'Hungary'
        },
        {
          value: 'ID',
          display: 'Indonesia'
        },
        {
          value: 'IE',
          display: 'Ireland'
        },
        {
          value: 'IL',
          display: 'Israel'
        },
        {
          value: 'IM',
          display: 'Isle of Man'
        },
        {
          value: 'IN',
          display: 'India'
        },
        {
          value: 'IO',
          display: 'British Indian Ocean Territory'
        },
        {
          value: 'IQ',
          display: 'Iraq'
        },
        {
          value: 'IR',
          display: 'Iran, Islamic Republic of'
        },
        {
          value: 'IS',
          display: 'Iceland'
        },
        {
          value: 'IT',
          display: 'Italy'
        },
        {
          value: 'JE',
          display: 'Jersey'
        },
        {
          value: 'JM',
          display: 'Jamaica'
        },
        {
          value: 'JO',
          display: 'Jordan'
        },
        {
          value: 'JP',
          display: 'Japan'
        },
        {
          value: 'KE',
          display: 'Kenya'
        },
        {
          value: 'KG',
          display: 'Kyrgyzstan'
        },
        {
          value: 'KH',
          display: 'Cambodia'
        },
        {
          value: 'KI',
          display: 'Kiribati'
        },
        {
          value: 'KM',
          display: 'Comoros'
        },
        {
          value: 'KN',
          display: 'Saint Kitts and Nevis'
        },
        {
          value: 'KP',
          display: "Korea, Democratic People's Republic of"
        },
        {
          value: 'KR',
          display: 'Korea, Republic of'
        },
        {
          value: 'KW',
          display: 'Kuwait'
        },
        {
          value: 'KY',
          display: 'Cayman Islands'
        },
        {
          value: 'KZ',
          display: 'Kazakhstan'
        },
        {
          value: 'LA',
          display: "Lao People's Democratic Republic"
        },
        {
          value: 'LB',
          display: 'Lebanon'
        },
        {
          value: 'LC',
          display: 'Saint Lucia'
        },
        {
          value: 'LI',
          display: 'Liechtenstein'
        },
        {
          value: 'LK',
          display: 'Sri Lanka'
        },
        {
          value: 'LR',
          display: 'Liberia'
        },
        {
          value: 'LS',
          display: 'Lesotho'
        },
        {
          value: 'LT',
          display: 'Lithuania'
        },
        {
          value: 'LU',
          display: 'Luxembourg'
        },
        {
          value: 'LV',
          display: 'Latvia'
        },
        {
          value: 'LY',
          display: 'Libyan Arab Jamahiriya'
        },
        {
          value: 'MA',
          display: 'Morocco'
        },
        {
          value: 'MC',
          display: 'Monaco'
        },
        {
          value: 'MD',
          display: 'Moldova, Republic of'
        },
        {
          value: 'ME',
          display: 'Montenegro'
        },
        {
          value: 'MF',
          display: 'Saint Martin'
        },
        {
          value: 'MG',
          display: 'Madagascar'
        },
        {
          value: 'MH',
          display: 'Marshall Islands'
        },
        {
          value: 'MK',
          display: 'Macedonia'
        },
        {
          value: 'ML',
          display: 'Mali'
        },
        {
          value: 'MM',
          display: 'Myanmar'
        },
        {
          value: 'MN',
          display: 'Mongolia'
        },
        {
          value: 'MO',
          display: 'Macao'
        },
        {
          value: 'MP',
          display: 'Northern Mariana Islands'
        },
        {
          value: 'MQ',
          display: 'Martinique'
        },
        {
          value: 'MR',
          display: 'Mauritania'
        },
        {
          value: 'MS',
          display: 'Montserrat'
        },
        {
          value: 'MT',
          display: 'Malta'
        },
        {
          value: 'MU',
          display: 'Mauritius'
        },
        {
          value: 'MV',
          display: 'Maldives'
        },
        {
          value: 'MW',
          display: 'Malawi'
        },
        {
          value: 'MX',
          display: 'Mexico'
        },
        {
          value: 'MY',
          display: 'Malaysia'
        },
        {
          value: 'MZ',
          display: 'Mozambique'
        },
        {
          value: 'NA',
          display: 'Namibia'
        },
        {
          value: 'NC',
          display: 'New Caledonia'
        },
        {
          value: 'NE',
          display: 'Niger'
        },
        {
          value: 'NF',
          display: 'Norfolk Island'
        },
        {
          value: 'NG',
          display: 'Nigeria'
        },
        {
          value: 'NI',
          display: 'Nicaragua'
        },
        {
          value: 'NL',
          display: 'Netherlands'
        },
        {
          value: 'NO',
          display: 'Norway'
        },
        {
          value: 'NP',
          display: 'Nepal'
        },
        {
          value: 'NR',
          display: 'Nauru'
        },
        {
          value: 'NU',
          display: 'Niue'
        },
        {
          value: 'NZ',
          display: 'New Zealand'
        },
        {
          value: 'OM',
          display: 'Oman'
        },
        {
          value: 'PA',
          display: 'Panama'
        },
        {
          value: 'PE',
          display: 'Peru'
        },
        {
          value: 'PF',
          display: 'French Polynesia'
        },
        {
          value: 'PG',
          display: 'Papua New Guinea'
        },
        {
          value: 'PH',
          display: 'Philippines'
        },
        {
          value: 'PK',
          display: 'Pakistan'
        },
        {
          value: 'PL',
          display: 'Poland'
        },
        {
          value: 'PM',
          display: 'Saint Pierre and Miquelon'
        },
        {
          value: 'PN',
          display: 'Pitcairn'
        },
        {
          value: 'PR',
          display: 'Puerto Rico'
        },
        {
          value: 'PS',
          display: 'Palestinian Territory'
        },
        {
          value: 'PT',
          display: 'Portugal'
        },
        {
          value: 'PW',
          display: 'Palau'
        },
        {
          value: 'PY',
          display: 'Paraguay'
        },
        {
          value: 'QA',
          display: 'Qatar'
        },
        {
          value: 'RE',
          display: 'Reunion'
        },
        {
          value: 'RO',
          display: 'Romania'
        },
        {
          value: 'RS',
          display: 'Serbia'
        },
        {
          value: 'RU',
          display: 'Russian Federation'
        },
        {
          value: 'RW',
          display: 'Rwanda'
        },
        {
          value: 'SA',
          display: 'Saudi Arabia'
        },
        {
          value: 'SB',
          display: 'Solomon Islands'
        },
        {
          value: 'SC',
          display: 'Seychelles'
        },
        {
          value: 'SD',
          display: 'Sudan'
        },
        {
          value: 'SE',
          display: 'Sweden'
        },
        {
          value: 'SG',
          display: 'Singapore'
        },
        {
          value: 'SH',
          display: 'Saint Helena'
        },
        {
          value: 'SI',
          display: 'Slovenia'
        },
        {
          value: 'SJ',
          display: 'Svalbard and Jan Mayen'
        },
        {
          value: 'SK',
          display: 'Slovakia'
        },
        {
          value: 'SL',
          display: 'Sierra Leone'
        },
        {
          value: 'SM',
          display: 'San Marino'
        },
        {
          value: 'SN',
          display: 'Senegal'
        },
        {
          value: 'SO',
          display: 'Somalia'
        },
        {
          value: 'SR',
          display: 'Suriname'
        },
        {
          value: 'SS',
          display: 'South Sudan'
        },
        {
          value: 'ST',
          display: 'Sao Tome and Principe'
        },
        {
          value: 'SV',
          display: 'El Salvador'
        },
        {
          value: 'SX',
          display: 'Sint Maarten'
        },
        {
          value: 'SY',
          display: 'Syrian Arab Republic'
        },
        {
          value: 'SZ',
          display: 'Swaziland'
        },
        {
          value: 'TC',
          display: 'Turks and Caicos Islands'
        },
        {
          value: 'TD',
          display: 'Chad'
        },
        {
          value: 'TF',
          display: 'French Southern Territories'
        },
        {
          value: 'TG',
          display: 'Togo'
        },
        {
          value: 'TH',
          display: 'Thailand'
        },
        {
          value: 'TJ',
          display: 'Tajikistan'
        },
        {
          value: 'TK',
          display: 'Tokelau'
        },
        {
          value: 'TL',
          display: 'Timor-Leste'
        },
        {
          value: 'TM',
          display: 'Turkmenistan'
        },
        {
          value: 'TN',
          display: 'Tunisia'
        },
        {
          value: 'TO',
          display: 'Tonga'
        },
        {
          value: 'TR',
          display: 'Turkey'
        },
        {
          value: 'TT',
          display: 'Trinidad and Tobago'
        },
        {
          value: 'TV',
          display: 'Tuvalu'
        },
        {
          value: 'TW',
          display: 'Taiwan'
        },
        {
          value: 'TZ',
          display: 'Tanzania, United Republic of'
        },
        {
          value: 'UA',
          display: 'Ukraine'
        },
        {
          value: 'UG',
          display: 'Uganda'
        },
        {
          value: 'UM',
          display: 'United States Minor Outlying Islands'
        },
        {
          value: 'US',
          display: 'United States'
        },
        {
          value: 'UY',
          display: 'Uruguay'
        },
        {
          value: 'UZ',
          display: 'Uzbekistan'
        },
        {
          value: 'VA',
          display: 'Holy See (Vatican City State)'
        },
        {
          value: 'VC',
          display: 'Saint Vincent and the Grenadines'
        },
        {
          value: 'VE',
          display: 'Venezuela'
        },
        {
          value: 'VG',
          display: 'Virgin Islands, British'
        },
        {
          value: 'VI',
          display: 'Virgin Islands, U.S.'
        },
        {
          value: 'VN',
          display: 'Vietnam'
        },
        {
          value: 'VU',
          display: 'Vanuatu'
        },
        {
          value: 'WF',
          display: 'Wallis and Futuna'
        },
        {
          value: 'WS',
          display: 'Samoa'
        },
        {
          value: 'YE',
          display: 'Yemen'
        },
        {
          value: 'YT',
          display: 'Mayotte'
        },
        {
          value: 'ZA',
          display: 'South Africa'
        },
        {
          value: 'ZM',
          display: 'Zambia'
        },
        {
          value: 'ZW',
          display: 'Zimbabwe'
        }
      ],
      multiple: true,
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'fullResultsForOnDemand',
      name: 'Return all Countries for On-Demand Lookups',
      description:
        'If checked, the integration will return results for all countries when an On-demand search is run (i.e., Country Whitelist and Country Blacklist settings will be ignored for On-Demand lookups).',
      default: false,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'showFullCountryName',
      name: 'Show Full Country Name in Summary',
      description:
        'If checked, integration will always display the full country name rather than just the country ISO Code in the MaxMind notification summary',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'showState',
      name: 'Show State in Summary',
      description:
        'If checked, the integration will display the state or subdivision information when available in the MaxMind notification summary',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'showAsnTag',
      name: 'Show ASN and Org Info in Summary',
      description: 'If checked, the integration will display the ASN and organization information as a summary tag',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'pathToCityDatabase',
      name: 'MaxMind City Database File Path',
      description:
        "A file path to pointing to the MaxMind City database file.  If a relative path is provided, the path will be relative to the MaxMind integration directory on the Polarity Server. If left blank, the default value of 'database/GeoLite2-City.mmdb' will be used.",
      default: 'database/GeoLite2-City.mmdb',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'pathToAsnDatabase',
      name: 'MaxMind ASN Database File Path',
      description:
        "A file path to pointing to the MaxMind ASN database file.  If a relative path is provided, the path will be relative to the MaxMind integration directory on the Polarity Server. If left blank, the default value of 'database/GeoLite2-ASN.mmdb' will be used.",
      default: 'database/GeoLite2-ASN.mmdb',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
