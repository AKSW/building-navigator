class MapStore {
    constructor(logger) {
        this.logger = logger;

        this.config = {
            center: {
                lat: 51.3412,
                lng: 12.3747
            },
            zoom: 13
        }
    }

    update(configKey, value) {
        this.config[configKey] = value;
    }

    updateCenter(newLat, newLng) {
        this.update('center', {
            lat: newLat,
            lng: newLng
        });
    }

    updateZoom(newZoom) {
        this.update('zoom', newZoom);
    }
}

export default MapStore;
