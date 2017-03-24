import React from 'react';
import ReactDOM from 'react-dom';

import Logger from './utils/Logger';
import * as Store from './stores';
import EventHandler from './EventHandler';
import BuildingNavigator from './BuildingNavigator';

/**
 * Initial create Logger and stores.
 * Render BuildingNavigator and pass Logger and stores
 *
 * @param {Object} config Configuration object which has key 'container' set to target ID.
 * @throws Container id not given
 */
const runBuildingNavigator = (config) => {
    if (! ('container' in config)) {
        throw new Error('Error: "container" id not found');
    }
    const appEl = document.getElementById(config.container);

    // init logger
    const loggerMode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
    // init stores
    const logger = new Logger(loggerMode);
    const stores = {
        buildingStore: new Store.BuildingStore(logger),
        filterStore: new Store.FilterStore(logger),
        mapStore: new Store.MapStore(logger),
        uiStore: new Store.UIStore(logger)
    };
    // init event handler
    const eventHandler = new EventHandler(stores, logger);

    // add userconfig to uiStore
    eventHandler.handleEvent({
        action: 'update-ui-config',
        payload: {key: 'userConfig', value: config}
    });

    // set isSmallView to uiStore, we need the timout, otherwise offsetWidth is 0
    /*window.setTimeout(() => {
        if (appEl.offsetWidth <= stores.uiStore.get('smallViewMax')) {
            eventHandler.handleEvent({
                action: 'update-ui-config',
                payload: {key: 'isSmallView', value: true}
            });
        }
    }, 0);*/

    // render the app
    ReactDOM.render( <BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />, appEl );
}

module.exports = runBuildingNavigator;
