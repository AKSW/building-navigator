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
                        response => resolve(response),
                        error => reject(error)
                    );
                    break;
                case 'may-load-building-data':
                    this.stores.buildingStore.mayLoadBuildingData(payload.buildingId).then(
                        response => resolve(response),
                        error => reject(error)
                    );
                    break;
                case 'load-building-data':
                    this.stores.buildingStore.loadBuildingData(payload.buildingId).then(
                        response => resolve(response),
                        error => reject(error)
                    );
                    break;
                case 'apply-filters':
                    this.stores.buildingStore.applyFilters(this.stores.filterStore.getAll());
                    resolve(true);
                    break;
                case 'apply-bounds':
                    const bounds = this.stores.mapStore.get('bounds');
                    this.stores.buildingStore.applyBounds( bounds.northEast, bounds.southWest);
                    resolve(true);
                    break;
                case 'toggle-show-building-details':
                    this.stores.buildingStore.toggleShowBuildingDetails(payload.buildingId);
                    resolve(true);
                    break;
                case 'show-building-details':
                    this.stores.buildingStore.showBuildingDetails(payload.buildingId);
                    resolve(true);
                    break;
                case 'hide-building-details':
                    this.stores.buildingStore.hideBuildingDetails(payload.buildingId);
                    resolve(true);
                    break;
                case 'set-selected-on-map':
                    this.stores.buildingStore.setSelectedOnMap(payload.buildingId);
                    resolve(true);
                    break;
                /*
                FilterStore() events
                */
                case 'update-filter':
                    this.stores.filterStore.update(payload.filterId, payload.value);
                    resolve(true);
                    break;
                case 'reset-all-filters':
                    this.stores.filterStore.resetAll();
                    resolve(true);
                    break;
                /*
                UIStore() events
                */
                case 'update-ui-config':
                    this.stores.uiStore.update(payload.key, payload.value);
                    resolve(true);
                    break;
                case 'toggle-sidebar':
                    const currSidebState = this.stores.uiStore.get('sidebarIsVisible');
                    this.stores.uiStore.update('sidebarIsVisible', !currSidebState);
                    resolve(true);
                    break;
                case 'show-sidebar':
                    this.stores.uiStore.update('sidebarIsVisible', true);
                    resolve(true);
                    break;
                case 'hide-sidebar':
                    this.stores.uiStore.update('sidebarIsVisible', false);
                    resolve(true);
                    break;
                case 'next-results':
                    this.stores.uiStore.update('resultsStart', this.stores.uiStore.get('resultsStart') + this.stores.uiStore.get('resultsSteps'));
                    resolve(true);
                    break;
                case 'prev-results':
                    this.stores.uiStore.update('resultsStart', this.stores.uiStore.get('resultsStart') - this.stores.uiStore.get('resultsSteps'));
                    resolve(true);
                    break;
                /*
                MapStore() events
                */
                case 'update-map-config':
                    this.stores.mapStore.updateMapConfig(payload.bounds, payload.center, payload.zoom);
                    resolve(true);
                    break;
                case 'update-map-bound':
                    this.stores.mapStore.updateBounds(payload.northEast, payload.southWest);
                    resolve(true);
                    break;
                case 'update-map-center':
                    this.stores.mapStore.updateCenter(payload.latitude, payload.longitude);
                    resolve(true);
                    break;
                case 'update-map-zoom':
                    this.stores.mapStore.updateZoom(payload.zoom);
                    resolve(true);
                    break;
                default:
                    reject('Unkown action given: ' + action);
                /*
                RouterStore() events
                */
                case 'set-current-route':
                    this.stores.routerStore.setCurrentRoute(payload.path);
                    resolve(true);
                    break;
                case 'get-current-route':
                    this.stores.routerStore.getCurrentRoute();
                    resolve(true);
                    break;
            }
            this.logger.log('Current stores: ', this.stores);
        });
    }
}

export default EventHandler;
