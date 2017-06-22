'use strict';

polarity.export = PolarityComponent.extend({
    details: Ember.computed.alias('block.data.details'),
    hasGeolocationData: Ember.computed('details.city', 'details.country', function () {
        if (this.get('details.city') ||
            this.get('details.country')) {
            return true;
        }
        return false;
    }),
    stateSummary: Ember.computed('details.subdivisions', function () {
        if (this.get('details.subdivisions') && this.get('details.subdivisions.length') > 0) {
            let subdivision = this.get('details.subdivisions')[0];
            let iso = subdivision.iso_code;
            let state = subdivision.names.en;
            let city = this.get('details.city.names.en');

            if (state !== city && iso !== null && typeof(iso) !== 'undefined') {
                if (/^\d+$/.test(iso)) {
                    return state;
                } else {
                    if(!this.get('details.city')){
                        return state + ', ';
                    }
                    return iso;
                }
            }
        }

        return '';
    }),
    countrySummary: Ember.computed('details.city', 'details.country', function () {
        let city = this.get('details.city');
        if (city === null || typeof(city) === 'undefined') {
            // No city data so we pass back full country name
            return this.get('details.country.names.en');
        } else if (this.get('details.userOptions.showFullCountryName')) {
            return '(' + this.get('details.country.names.en') + ')';
        } else {
            return '(' + this.get('details.country.iso_code') + ')';
        }
    })
});

