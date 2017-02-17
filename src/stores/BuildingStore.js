import JsonLoader from '../utils/JsonLoader';

class BuildingStore {
    constructor(logger) {
        this.logger = logger;
        this.buildings = [];
        this.jsonLoader = new JsonLoader();
    }

    /**
     * Load initial buildings data
     *
     * @return Promise, length of added buildings
     * @throws Error on loadJson
     */
    initAll() {
        /*
        * Private function to add buildings
        */
        const addAll = (buildings) => {
            for (const idx in buildings) {
                const building = buildings[idx];
                building.id = idx;
                building.visible = true;
                building.a11yRating = 0.0;
                this.buildings.push(building);
            }
        };
        
        return this.jsonLoader.loadJson('/building-coordinates.json')
            .then((buildings) => {
                addAll(buildings);
                return this.buildings.length;
            }).catch((ex) => {
                throw new Error(ex);
            });
    }

    loadBuildingData(id) {
        return this.jsonLoader.loadJson(`/buildings/${id}.json`)
            .then((data) => {
                //addAll(buildings);
                return true;
            }).catch((ex) => {
                throw new Error(ex);
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
     * Apply filters to buildings
     *
     * @param {Array} Array with all filters
     */
    applyFilters(filters) {
        this.buildings.forEach((building, id) => {
            let isVisible = true;
            filters.forEach((filter, fid) => {

                if (filter.uniqueKey === 'title') {
                    // filter by title ...
                } else if (building[filter.uniqueKey] < filter.selected) {
                    isVisible = false;
                    return;
                }

            });
            building.visible = isVisible;
        });
    }
}

export default BuildingStore;
