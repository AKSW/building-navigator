import Promise from 'promise-polyfill';
import JsonLoader from '../utils/JsonLoader';
import {getDistance} from '../utils/GeoUtils';

/**
 * Stores all buildings
 *
 * Init all initial buildings data and load all data of a building
 * Applies filter and map-boundings to buildings (flag building.visible)
 */
class BuildingStore {
    constructor(logger) {
        this.logger = logger;
        this.buildings = [];
        this.buildingDefaults = {
            id: null,
            // is visible after apply filters
            visible: true,
            // is in bounds (northEast and southWest) of map
            inBounds: true,
            // show details of building
            showDetails: false,
            // accessibility rating
            a11yRating: 0.00,
            // use selected marker on map
            selectOnMap: false,
            // object for loading data
            data: {}
        }
        this.jsonLoader = new JsonLoader();
    }

    /**
     * Init all buildings data
     *
     * @return Promise, length of added buildings
     * @throws Error on loadJson
     */
    initAll() {
        // private function to add buildings to this.buildings
        const addAll = (buildings) => {
            for (const idx in buildings) {
                const building = Object.assign({}, this.buildingDefaults, buildings[idx], {
                    id: idx
                });
                building.a11yRating = this.getA11yRating(building);
                this.buildings.push(building);
            }
            this.buildings.sort((a, b) => {
                if (a.a11yRating > b.a11yRating) return -1;
                if (a.a11yRating < b.a11yRating) return 1;
                return 0;
            });
            return this.buildings.length;
        };

        return this.jsonLoader.loadJson('/building-coordinates.json')
            .then((buildings) => {
                const added = addAll(buildings);
                if (added == 0) {
                    throw new Error('No buildings initiated');
                }
                return added;
            }).catch((ex) => {
                throw new Error(ex);
            });
    }

    /**
     * Load data of a building and save to buildings
     *
     * @param {String} Id of building
     * @return Promise, true if buildings-data loaded
     * @throws Error if loadJson fails
     */
    loadBuildingData(id) {
        // private function to save the data to building
        const load = (data) => {
            const building = this.getBuilding(id);
            if (building === undefined) {
                return false;
            }
            building.data = data;
            return true;
        };

        return this.jsonLoader.loadJson(`/buildings/${id}.json`)
            .then((data) => {
                const loaded = load(data);
                if (loaded == false) {
                    throw new Error(`Couldnt find building data with id "${id}"`);
                }
                return loaded;
            }).catch((ex) => {
                throw new Error(ex);
            });
    }

    /**
     * Load building data, if not yet loaded
     *
     * @param {String} Id of building
     * @return Promise of `loadBuildingData()` or true-Promise if data already loaded
     */
    mayLoadBuildingData(id) {
        const building = this.getBuilding(id);
        if (!building.data.hasOwnProperty('id')) {
            return this.loadBuildingData(id);
        } else {
            return new Promise((resolve, reject) => {resolve(true)});
        }
    }

    /**
     * Get accessibility (a11y) rating of a building
     *
     * @param {Object} Building
     * @return {Float}
     */
    getA11yRating(building) {
        let rating = 0.00

        if (building['general-help'] === 1) {
            rating++
        }
        if (building['help-for-blind'] === 1) {
            rating++
        }
        if (building['help-for-hearing-imp'] === 1) {
            rating++
        }

        if (building['parking-f-disabled-avail'] === 1) {
            rating++;
        } else if (building['parking-avail'] === 1) {
            rating = rating + 0.01;
        }

        // toilet-suit-f-wheelchair is 1 or 2
        if (building['toilet-suit-f-wheelchair'] === 2) {
            rating++;
        } else if (building['toilet-suit-f-wheelchair'] === 1) {
            rating = rating + 0.5;
        } else if (building['toilet-avail'] === 1) {
            rating = rating + 0.01;
        }

        // lift-suit-f-wheelchair is 1
        if (building['lift-suit-f-wheelchair'] === 1) {
            rating++;
        } else if (building['lift-avail'] === 1) {
            rating = rating + 0.01;
        }

        // entrance-suit-f-wheelchair: is 1 or 2
        if (building['entrance-suit-f-wheelchair'] === 2) {
            rating++;
        } else if (building['entrance-suit-f-wheelchair'] === 1) {
            rating = rating + 0.5;
        }

        return rating;
    }

    /**
     * Get specific building with given id
     *
     * @param {String} Id of building
     * @return {Object} Building or undefined if not found
     */
    getBuilding(id) {
        return this.buildings.find((building) => {
            return building.id == id;
        });
    }

    /**
     * Get all buildings
     *
     * @return {Array}
     */
    getAll() {
        return this.buildings;
    }

    /**
     * Get all visible buildings
     *
     * @return {Array}
     */
    getVisibles() {
        return this.buildings.filter((building) => {
            return building.visible == true && building.inBounds == true;
        });
    }

    /**
     * Sort an array of buildings by distance to location
     *
     * @param {Array} Buildings
     * @param {Float} Latitude of location
     * @param {Float} Longitude of location
     * @return {Array} Sorted buildings
     */
    sortByDistance({buildings, latitude, longitude}) {
        buildings.sort((a, b) => {
            const distA = getDistance({
                lat1: latitude,
                lng1: longitude,
                lat2: a.latitude,
                lng2: a.longitude
            });
            const distB = getDistance({
                lat1: latitude,
                lng1: longitude,
                lat2: b.latitude,
                lng2: b.longitude
            });
            // if distance a to center is less then distance b to center, return -1
            if (distA < distB) {
                return -1;
            }
            if (distA > distB) {
                return 1;
            }
            return 0;
        });
        return buildings;
    }

    /**
     * Apply filters to buildings, set isVisible for each building to true or false
     *
     * @param {Array} Array with all filters
     */
    applyFilters(filters) {
        this.getAll().forEach((building, id) => {
            let isVisible = true;
            filters.forEach((filter, fid) => {

                if (filter.type == 'search') {
                    const r = new RegExp(filter.value, "i");
                    if (building.title.match(r) === null) {
                        isVisible = false;
                        return;
                    }
                }
                else if (filter.type == 'select-one') {
                    const fset = filter.valueSet[filter.value];
                    if (building[fset.key] < fset.value) {
                        isVisible = false;
                        return;
                    }
                }
                else if (filter.type == 'checkbox') {
                    if (building[filter.key] < filter.value) {
                        isVisible = false;
                        return;
                    }
                }

            });
            building.visible = isVisible;
        });
    }

    /**
     * Apply map bounds to buildings, set inBounds to true or false for each building
     *
     * @param {Object} northEast Object with latitude and longitude
     * @param {Object} northWest Object with latitude and longitude
     */
    applyBounds(northEast, southWest) {
        this.getAll().forEach((building, id) => {
            let isInBounds = false;
            if (building.latitude <= northEast.latitude &&
                building.longitude <= northEast.longitude &&
                building.latitude >= southWest.latitude &&
                building.longitude >= southWest.longitude
            ) {
                isInBounds = true;
            }
            building.inBounds = isInBounds;
        });
    }

    /**
     * Toggle if details of a given building is shown
     *
     * @param {String} Id of building
     */
    toggleShowBuildingDetails(id) {
        const building = this.getBuilding(id);
        building.showDetails = ! building.showDetails;
    }

    /**
     * Show details of a given building
     *
     * @param {String} Id of building
     */
    showBuildingDetails(id) {
        const building = this.getBuilding(id);
        building.showDetails = true;
    }

    /**
     * Hide details of a given building
     *
     * @param {String} Id of building
     */
    hideBuildingDetails(id) {
        const building = this.getBuilding(id);
        building.showDetails = false;
    }

    /**
     * Sets flag for a building to use selected marker on map, only one building will be selected
     *
     * @param {String} Building id
     */
    setSelectedOnMap(id) {
        this.getAll().forEach((building) => {
            let isSelected = false;
            if (building.id == id) {
                isSelected = true;
            }
            building.selectOnMap = isSelected;
        });
    }
}

export default BuildingStore;
