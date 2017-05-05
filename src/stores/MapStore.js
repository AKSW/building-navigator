import Cookies from 'js-cookie';

/**
 * Stores settings for the map like current zoom state, the center
 * Also contains the leaflet node (this.noe) to retrieve leaflet functions
 */
class MapStore {
    constructor(logger) {
        this.logger = logger;

        this.node = null;

        this.config = {
            // center of the map, get from cookie or use center of leipzig (51.3412, 12.3747)
            center: Cookies.get('mapCenter') !== undefined
                ? JSON.parse(Cookies.get('mapCenter'))
                : {
                    latitude: 51.3412,
                    longitude: 12.3747
                },
            // zoom value, the greater the value, the closer the zoom
            zoom: 14,
            // bounds of the map from upper right to bottom left, will initiated after loading the map
            // and applies the visible buildings
            // the init values 99 and 999 just ensure that all buildings are visible on start
            bounds: {
                northEast: {
                    latitude: 99,
                    longitude: 999
                },
                southWest: {
                    latitude: 0,
                    longitude: 0
                }
            },
            // map bounds decreasing factor in (negative!) percent, avoids buildings too close to the border
            mapPadding: -0.1,
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
        Cookies.set('mapCenter', {
            latitude: newLatitude,
            longitude: newLongitude
        }, { expires: 30 });
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

    /**
     * Close previous opened popup on map
     */
    closePopup() {
        if (this.node === null) return;

        this.node.closePopup();
    }
}

export default MapStore;
