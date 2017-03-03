import Promise from 'promise-polyfill';

class EventHandler {
    constructor(stores, logger) {
        this.logger = logger;
        this.stores = stores;
    }

    /**
     * Handle events
     *
     * @param Object event with action and payload
     * @return Promise
     * @todo may split into stores if action list grows too long
     */
    handleEvent(event) {
        this.logger.log('Handle event: ', event);
        const action = event.action;
        const payload = event.payload;

        return new Promise((resolve, reject) => {
            switch(action) {
                /*
                BuildingStore() events
                */
                case 'init-buildings':
                    this.stores.buildingStore.initAll().then(
                        response => {
                            resolve();
                        },
                        error => {
                            reject(error);
                        }
                    );
                    break;
                case 'load-building-data':
                    this.stores.buildingStore.loadBuildingData(payload.buildingId).then(
                        response => {
                            resolve();
                        },
                        error => {
                            reject(error);
                        }
                    );
                    break;                
                case 'apply-filters':
                    this.stores.buildingStore.applyFilters(payload.filters);
                    resolve();
                    break;
                case 'toggle-show-building-details':
                    // may load building details first
                    const building = this.stores.buildingStore.getBuilding(payload.buildingId);
                    if (!building.data.hasOwnProperty('id')) {
                        this.handleEvent({action:'load-building-data', payload: payload}).then(
                            response => {
                                this.stores.buildingStore.toggleShowBuildingDetails(payload.buildingId);
                                resolve();
                            },
                            error => {
                                reject(error);
                            }
                        );

                    } else {
                        this.stores.buildingStore.toggleShowBuildingDetails(payload.buildingId);
                        resolve();
                    }
                    break;
                /*
                FilterStore() events
                */
                case 'update-filter':
                    this.stores.filterStore.update(payload.filterId, parseInt(payload.setKey));
                    resolve();
                    break;
                case 'reset-all-filters':
                    this.stores.filterStore.resetAll();
                    resolve();
                    break;
                /*
                UIStore() events
                */
                case 'update-ui-config':
                    this.stores.uiStore.update(payload.key, payload.value);
                    resolve();
                    break;
                /*
                MapStore() events
                */
                case 'update-map-config':
                    this.stores.mapStore.updateMapConfig(payload.center, payload.zoom);
                    resolve();
                    break;
                case 'update-map-center':
                    this.stores.mapStore.updateCenter(payload.latitude, payload.longitude);
                    resolve();
                    break;
                case 'update-map-zoom':
                    this.stores.mapStore.updateZoom(payload.zoom);
                    resolve();
                    break;
                default:
                    reject('Unkown action given: ' + action);
            }
        });
    }
}

export default EventHandler;
