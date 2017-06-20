module.exports = {
    /**
     * Name of the integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @required
     */
    "name": "Maxmind",
    /**
     * The acronym that appears in the notification window when information from this integration
     * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
     * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
     * here will be carried forward into the notification window.
     *
     * @type String
     * @required
     */
    "acronym": "MM",
    "logging": {level: 'trace'},
    "entityTypes": ['IPv4', 'IPv6'],
    /**
     * Description for this integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @optional
     */
    "description": "Polarity integration that connects to the Carbon Black threat intelligence platform",
    /**
     * An array of style files (css or less) that will be included for your integration. Any styles specified in
     * the below files can be used in your custom template.
     *
     * @type Array
     * @optional
     */
    "styles": [
        "./styles/maxmind.less"
    ],
    /**
     * Provide custom component logic and template for rendering the integration details block.  If you do not
     * provide a custom template and/or component then the integration will display data as a table of key value
     * pairs.
     *
     * @type Object
     * @optional
     */
    "block": {
        "component": {
            "file": "./components/maxmind-block.js"
        },
        "template": {
            "file": "./templates/maxmind-block.hbs"
        }
    },
    "summary": {
        "component": {
            "file": "./components/maxmind-summary.js"
        },
        "template": {
            "file": "./templates/maxmind-summary.hbs"
        }
    },
    "integrationBlock": {
        "file": "./block/maxmind.js"
    },
    /**
     * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
     * as an array of option objects.
     *
     * @type Array
     * @optional
     */
    "options": [
        {
            "key": "showFullCountryName",
            "name": "Show Full Country Name",
            "description": "If checked, integration will display the full country name",
            "default": false,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "showState",
            "name": "Show State",
            "description": "If checked, the integration will display the state or subdivision information",
            "default": false,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        }
    ]
};