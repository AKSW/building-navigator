class MapStore {
    constructor(logger) {
        this.logger = logger;

        this.config = {
            center: {
                latitude: 51.3412,
                longitude: 12.3747
            },
            zoom: 14
        }
    }

    /**
     * Updates a config value by its key with the given value.
     *
     * @param {String} Config key
     * @param {Mixed} New value
     */
    update(configKey, value) {
        this.config[configKey] = value;
    }

    /**
     * Updates the map config center and zoom
     *
     * @param {Object} Center with latitude and longitude
     * @param {Integer} New zoom
     */
    updateMapConfig(center, zoom) {
        this.updateCenter(center.latitude, center.longitude);
        this.updateZoom(zoom);
    }

    /**
     * Updates map center config by given latitude and longitude
     *
     * @param {Float} New latitude value
     * @param {Float} New longitude value
     */
    updateCenter(newLatitude, newLongitude) {
        this.update('center', {
            latitude: newLatitude,
            longitude: newLongitude
        });
    }

    /**
     * Updates map zoom config by given new zoom
     *
     * @param {Integer} New zoom value
     */
    updateZoom(newZoom) {
        this.update('zoom', newZoom);
    }

    /**
     * Get config-value by given key
     *
     * @param {String} Config key
     * @return {Mixed} Value
     */
    get(key) {
        return this.config[key];
    }
}

export default MapStore;
