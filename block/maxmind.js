'use strict';

polarity.export = IntegrationBlock.extend({
    maxmindMergeNetworks: true,
    ipAddresses: null,
    init: function(){
        this._super(...arguments);
        this.set('ipAddresses', Ember.A());
        this.set('ipAddressesSet', new Set());
    },
    /**
     * Override the setProperties method which is used to initialize the maxmindBlock so that we can set
     * a default value on data.network to be the same as the entity value
     */
    setProperties: function(){
        this._super(...arguments);

        // Provides backwards compatibility with Polarity clients that do not send the network information
        // as part of maxmind
        if(typeof(this.get('data.details.network')) === 'undefined'){
            this.set('data.details.network', this.get('entity.value'));
        }
    },
    notificationGroupingKey: Ember.computed('data.details.network', 'entity.value', 'maxmindMergeNetworks', 'ipAddresses.@each', function(){
        console.info("Getting groupingKey for " + this.get('entity.value'));
        console.info("IPAddresses Length: " + this.get('ipAddresses.length'));
        let key;
        if(this.get('maxmindMergeNetworks') === true && this.get('ipAddresses.length') <= 1) {
            key = this.get('entity.value');
        }else if(this.get('maxmindMergeNetworks') === true && this.get('ipAddresses.length') > 1) {
            key = this.get('data.details.network');
        }else{
            key =  this.get('entity.value');
        }
        console.info(key);
        this.set('displayValue', key);
        return key;
    }),
    entityValues: Ember.computed('data.details.network', 'entity.value', function(){
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
    belongsToNotification: function(notificationGroupingKey, entityValues, entityNotificationsDict){
        console.info("Calling MAXMIND belongsToNotification");
        console.info("EntityValues: " + JSON.stringify(entityValues));
        let entityName = entityValues[0];
        let network = entityValues[1];
        if(this.get('maxmindMergeNetworks') === true) {
            console.info("MAXMIND MERGE IS ENABLED");
            console.info("EntityName: " + JSON.stringify(entityName));
            console.info("network: " + JSON.stringify(network));
            if ((this.get('data.details.network') === network && entityNotificationsDict.has(this.get('entity.value')) === false) ||
                this.get('entity.value').toLowerCase() === entityName.toLowerCase()) {
                return true;
            }
        }else{
            console.info("MAXMIND MERGE IS DISABLED");
            if (this.get('entity.value').toLowerCase() === entityName.toLowerCase()) {
                return true;
            }
        }

        return false;
    },
    /**
     * This event is triggered anytime an integrationBlock is inserted in the notification window.  For the MaxMind
     * integration we want to see if the newly inserted entityNotification
     */
    onNotificationWindowBlockInserted: function(entityNotification, integrationBlock){
        // Don't do anything if the event is for this block
        if(integrationBlock.get('id') === this.get('id')){
            return;
        }

        // Don't do anything if the inserted block is a maxmind block with the same network
        if(integrationBlock.get('type') === this.get('type') &&
            integrationBlock.get('data.details.network') === this.get('data.details.network')){
            return;
        }

        let entity = integrationBlock.get('entity.value');
        let ipAddressesSet = this.get('ipAddressesSet');
        let ipAddresses = this.get('ipAddresses');
        if(ipAddressesSet.has(entity) && ipAddresses.length > 1){
            //let block = Ember.getOwner(this).lookup('object:notifications/maxmind/integration-block', {singleton: false});
            let block = Ember.getOwner(this).lookup(this.get('config.integrationBlockName'), {singleton: false});
            console.info('onNotificationWindowBLockInserted block:');
            console.info(block);
            var properties = this.getProperties(this.get('properties'));
            properties['entity'] = entity;
            properties['isCollapsed'] = integrationBlock.get('isCollapsed');
            console.info("Copied Properties:");
            console.info(properties);
            block.setProperties(properties);
            entityNotification.addBlock(block);
            console.info("Deleting: " + entity);
            ipAddressesSet.delete(entity);
            console.info(ipAddressesSet);
            this.set('ipAddresses', Array.from(ipAddressesSet));
            // If there is only one IP address left then we need to set the entity value for this block
            // to that IP address as it might have changed.  For example, if a maxmind block has IP A then IP B
            // the entity value will be IP A.  If IP A gets removed then we need to change the entity value to IP B
            if(this.get('ipAddresses').length === 1){
                this.set('entity.value', this.get('ipAddresses')[0]);
            }
        }
    },
    /**
     * This method is called every time the properties for this integrationBlock are set to include
     * when the integration block is first created.  Note that this method is very similar to the `update`
     * method but the `update` method is not called when the integrationBlock is first created.  You should
     * @param integrationBlockSource
     */
    onPropertiesSet: function(integrationBlockSource){
        // there is no default action for this method but it can be overridden to track block information
        var entity = integrationBlockSource.get('entity.value');
        var ipAddressesSet = this.get('ipAddressesSet');

        if(ipAddressesSet.has(entity) === false){
            this.get('ipAddressesSet').add(entity);
            this.get('ipAddresses').pushObject(entity);
            console.info("IP ADDRESSES: ");
            console.info(this.get('ipAddresses'));
        }
    }
});


