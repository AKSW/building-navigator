import React from 'react';
import ReactDOM from 'react-dom';

import Logger from './utils/Logger';
import * as Store from './stores';
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

    const loggerMode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
    const logger = new Logger(loggerMode);
    const stores = {
        buildingStore: new Store.BuildingStore(logger),
        filterStore: new Store.FilterStore(logger),
        mapStore: new Store.MapStore(logger),
        uiStore: new Store.UIStore(logger)
    };
    //const router = new Router(logger);
    //router.createRoutes();

    ReactDOM.render( <BuildingNavigator stores={stores} logger={logger} />, document.getElementById(config.container) );
}

module.exports = runBuildingNavigator;
