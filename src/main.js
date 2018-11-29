import React from 'react';
import ReactDOM from 'react-dom';

import Logger from './utils/Logger';
import * as Store from './stores';
import EventHandler from './EventHandler';
import BuildingNavigator from './BuildingNavigator';

/**
 * Entry file to init and render the app.
 *
 * Initial create logger, stores and event handler.
 * Render main class BuildingNavigator and pass some props.
 *
 * @param {Object} config Configuration object which has key 'container' set to target ID.
 * @throws Container id not given
 */
const runBuildingNavigator = (config) => {
    if (! ('container' in config)) {
        throw new Error('Wrong initialization of this application, "container" in config not found.');
    }
    const appEl = document.getElementById(config.container);

    // init logger with logger mode from NODE_ENV variable from webpack config
    // For production usage it should be 'production' to hide unintended log messages
    const loggerMode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
    const logger = new Logger(loggerMode);

    // init stores with prev created logger
    const stores = {
        buildingStore: new Store.BuildingStore(logger),
        filterStore: new Store.FilterStore(logger),
        mapStore: new Store.MapStore(logger),
        uiStore: new Store.UIStore(logger),
        routerStore: new Store.RouterStore(logger)
    };

    // init event handler with prev created logger and stores
    const eventHandler = new EventHandler(stores, logger);

    // add userconfig to uiStore, e.g. to allow access to the root node container id
    eventHandler.handleEvent({
        action: 'update-ui-config',
        payload: {key: 'userConfig', value: config}
    });

    // render the app
    ReactDOM.render(<BuildingNavigator stores={stores} logger={logger} eventHandler={eventHandler} />, appEl);
}

module.exports = runBuildingNavigator;
