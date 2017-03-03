import JsonLoader from '../utils/JsonLoader';
import {getDistance} from '../utils/GeoUtils';

class BuildingStore {
    constructor(logger) {
        this.logger = logger;
        this.buildings = [];
        this.buildingDefaults = {
            id: null,
            visible: true,
            showDetails: false,
            a11yRating: 0.00,
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
                    id: idx,
                    a11yRating: this.getA11yRating(building)
                });
                this.buildings.push(building);
            }
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
            if (building == undefined) {
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
     * Get accessibility (a11y) rating of a building
     *
     * @param {Object} Building
     * @return {Float}
     */
    getA11yRating(building) {
        return 0.00;
    }

    /**
     * Get specific building with given id
     *
     * @param {String} Id of building
     * @return {Object} Building or undefined if not found
     */
    getBuilding(id) {
        return this.buildings.find((buildings) => {
            return buildings.id == id;
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
        return this.buildings.filter((buildings) => {
            return buildings.visible == true;
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
     * Apply filters to buildings
     *
     * @param {Array} Array with all filters
     */
    applyFilters(filters) {
        this.buildings.forEach((building, id) => {
            let isVisible = true;
            filters.forEach((filter, fid) => {

                // if (filter.id === 'title') {
                //     const r = new RegExp(filter.value, "i");
                //     if (building.title.match(r) === null) {
                //         isVisible = false;
                //         return;
                //     }
                // }
                const fset = filter.valueSet[filter.selected];
                if (building[fset.key] < fset.value) {
                    isVisible = false;
                    return;
                }

            });
            building.visible = isVisible;
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
}

export default BuildingStore;
