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
     * @todo may split into stores if action list grows too long
     */
    handleEvent(event) {
        const action = event.action;
        const payload = event.payload;

        return new Promise((resolve, reject) => {
            switch(action) {
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
                case 'update-filter':
                    this.stores.filterStore.update(payload.updated_filter_key, payload.new_filter_value);
                    resolve();
                    break;
                case 'apply-filters':
                    this.stores.buildingStore.applyFilters(payload.filters);
                    resolve();
                    break;
                case 'update-ui-config':
                    this.stores.uiStore.update(payload.key, payload.value);
                    resolve();
                    break;
                default:
                    reject('Unkown action given: ' + action);
            }
        });
    }
}

export default EventHandler;
