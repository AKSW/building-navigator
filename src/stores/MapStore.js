class MapStore {
    constructor(logger) {
        this.logger = logger;

        this.node = null;

        this.config = {
            bounds: {
                northEast: {
                    latitude: 999,
                    longitude: 999
                },
                southWest: {
                    latitude: 0,
                    longitude: 0
                }
            },
            center: {
                latitude: 51.3412,
                longitude: 12.3747
            },
            zoom: 14
        }
    }

    setNode(node) {
        this.node = node;
    }

    getNode() {
        // document.getElementById('map')
        return this.node;
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
     * @param {Object} Bounds with northEast and southWest Objects and latitude and longitude
     * @param {Object} Center with latitude and longitude
     * @param {Integer} New zoom
     */
    updateMapConfig(bounds, center, zoom) {
        this.updateBounds(bounds.northEast, bounds.southWest);
        this.updateCenter(center.latitude, center.longitude);
        this.updateZoom(zoom);
    }

    /**
     * Updates the bounds
     *
     * @param {Object} northWest with latitude and longitude as float values
     * @param {Object} southWest with latitude and longitude as float values
     */
    updateBounds(northEast, southWest) {
        this.update('bounds', {
            northEast, southWest
        });
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
