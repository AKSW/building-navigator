import * as Store from '../../src/stores';
import EventHandler from '../../src/EventHandler';
import Logger from '../../src/utils/Logger';

/**
 * Get new Logger
 */
export const getLogger = () => new Logger();

/**
 * Get stores (buildingStore, filterStore, ...) object
 *
 * @param logger Optional Logger
 */
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

/**
 * Get EventHandler
 *
 * @param stores Optional stores
 * @param logger Optional logger
 */
export const getEventHandler = (stores = undefined, logger = undefined) => {
    if (logger === undefined) {
        logger = getLogger();
    }
    if (stores === undefined) {
        stores = getStores(logger);
    }
    return new EventHandler(stores, logger);
};
