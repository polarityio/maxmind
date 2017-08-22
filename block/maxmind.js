'use strict';

polarity.export = IntegrationBlock.extend({
    maxmindMergeNetworks: true,
    ipAddresses: null,
    init: function () {
        this._super(...arguments);
        this.set('ipAddresses', Ember.A());
        this.set('ipAddressesSet', new Set());
    },
    notificationGroupingKey: Ember.computed('data.details.network', 'entity.value', 'maxmindMergeNetworks', 'ipAddresses.@each', function () {
        let key;

        if (this.get('maxmindMergeNetworks') === true && this.get('ipAddresses.length') <= 1) {
            key = this.get('entity.value');
        } else if (this.get('maxmindMergeNetworks') === true && this.get('ipAddresses.length') > 1) {
            key = this.get('data.details.network');
        } else {
            key = this.get('entity.value');
        }

        this.set('displayValue', key);
        return key;
    }),
    entityValues: Ember.computed('data.details.network', 'entity.value', function () {
        return [this.get('entity.value'), this.get('data.details.network')];
    }),
    /**
     * We should add the maxmind block to an existing entityNotification if the
     * maxmind entity (IP) matches the entityName (e.g., an exact match between IP addresses)
     * or if the entityName is a CIDR in which case we would match on the maxmind network
     *
     * This allows maxmind blocks to be added both to the existing maxmind rollup and to any existing
     * notifications for the specific maxmind IP.
     * @param entityName
     * @returns {boolean}
     */
    belongsToNotification: function (notificationGroupingKey, entityValues, entityNotificationsDict) {
        let entityName = entityValues[0];
        let network = entityValues[1];
        let thisEntityName = this.get('entity.value');

        if(entityName === null || typeof entityName === 'undefined' ||
            typeof thisEntityName === 'undefined' || thisEntityName === null) {
            let debug = {
                notificationGroupingKey: notificationGroupingKey,
                entityValues: entityValues,
                entityNotificationsDict: entityNotificationsDict,
                thisEntityValue: thisEntityName
            };

            console.error(JSON.stringify(debug));

            return false;
        }

        if (this.get('maxmindMergeNetworks') === true) {
            if ((this.get('data.details.network') === network && entityNotificationsDict.has(this.get('entity.value')) === false) ||
                this.get('entity.value').toLowerCase() === entityName.toLowerCase()) {
                return true;
            }
        } else {
            if (this.get('entity.value').toLowerCase() === entityName.toLowerCase()) {
                return true;
            }
        }

        return false;
    },
    /**
     * This event is triggered anytime an integrationBlock is inserted in the notification window.  For the MaxMind
     * integration we want to see if the newly inserted entityNotification
     *
     * @param entityNotification entityNotificationBlock into which it was inserted
     * @param integrationBlock integrationBlock that has been inserted
     */
    onNotificationWindowBlockInserted: function (entityNotification, integrationBlock) {
        // Don't do anything if the event is for this block
        if (integrationBlock.get('id') === this.get('id')) {
            return;
        }

        // Don't do anything if the inserted block is a maxmind block with the same network
        if (integrationBlock.get('type') === this.get('type') &&
            integrationBlock.get('data.details.network') === this.get('data.details.network')) {
            return;
        }

        let insertedEntityObj = integrationBlock.get('entity');
        let insertedEntityValue = integrationBlock.get('entity.value');
        let ipAddressesSet = this.get('ipAddressesSet');
        let ipAddresses = this.get('ipAddresses');

        // If the inserted block has an entityValue that matches one of the IP addresses in our maxmind block
        // and our maxmind block has more than one IP in it, then we want to create a new integrationBlock that
        // gets inserted into the updated entityNotificationBlock.  At the same time we need to remove the IP address
        //
        // Essentially, we are "unrolling" an IP address out of our rolled up maxmind notification block
        if (ipAddressesSet.has(insertedEntityValue) && ipAddresses.length > 1) {
            let clonedBlock = this.deepCloneIntegrationBlock(this);
            clonedBlock.set('entity', insertedEntityObj);
            clonedBlock.set('isCollapsed', integrationBlock.get('isCollapsed'));
            entityNotification.addBlock(clonedBlock);

            ipAddressesSet.delete(insertedEntityValue);
            this.set('ipAddresses', Array.from(ipAddressesSet));

            // If there is only one IP address left then we need to set the entity value for this block
            // to that IP address as it might have changed.  For example, if a maxmind block has IP A then IP B
            // the entity value will be IP A.  If IP A gets removed then we need to change the entity value to IP B
            if (this.get('ipAddresses').length === 1) {
                this.set('entity.value', this.get('ipAddresses')[0]);
            }
        }
    },
    /**
     * This method is called every time the properties for this integrationBlock are set to include
     * when the integration block is first created.  Note that this method is very similar to the `update`
     * method but the `update` method is not called when the integrationBlock is first created.
     *
     * If the properties for this integrationBlock are being set then it means that a new IP address could be
     * added to the network block.  We want to track all individual IP Addresses added to this block so
     * we display them in the details.
     *
     * @param integrationBlockSource
     */
    onPropertiesSet: function (integrationBlockSource) {
        // there is no default action for this method but it can be overridden to track block information
        var entity = integrationBlockSource.get('entity.value');
        var ipAddressesSet = this.get('ipAddressesSet');

        if (ipAddressesSet.has(entity) === false) {
            this.get('ipAddressesSet').add(entity);
            this.get('ipAddresses').pushObject(entity);
        }
    }
});


