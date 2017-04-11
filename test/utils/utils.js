import * as Store from '../../src/stores';
import EventHandler from '../../src/EventHandler';
import Logger from '../../src/utils/Logger';

// return logger
export const getLogger = () => new Logger();

// return stores
// @param logger
export const getStores = (logger = undefined) => {
    if (logger === undefined) {
        logger = getLogger();
    }
    return {
        buildingStore: new Store.BuildingStore(logger),
        filterStore: new Store.FilterStore(logger),
        mapStore: new Store.MapStore(logger),
        uiStore: new Store.UIStore(logger),
        routerStore: new Store.RouterStore(logger)
    };
};


// return eventHandler
// @param stores
// @param logger
export const getEventHandler = (stores = undefined, logger = undefined) => {
    if (logger === undefined) {
        logger = getLogger();
    }
    if (stores === undefined) {
        stores = getStores(logger);
    }
    return new EventHandler(stores, logger);
};