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
                building.a11yRating = this.getA11yRating(building);
                this.buildings.push(building);
            }
            return this.buildings.length;
        };
        
        return this.jsonLoader.loadJson('/building-coordinates.json')
            .then((buildings) => {
                return addAll(buildings);
            }).catch((ex) => {
                throw new Error(ex);
            });
    }

    loadBuildingData(id) {
        const load = (data) => {
            // @todo
            return true;
        };

        return this.jsonLoader.loadJson(`/buildings/${id}.json`)
            .then((data) => {
                return load(data);
            }).catch((ex) => {
                throw new Error(ex);
            });
    }

    /**
     * Get accessibility (a11y) rating of a building
     *
     * @return {Float}
     */
    getA11yRating(building) {
        return 0.00;
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
                    const r = new RegExp(filter.value, "i");
                    if (building.title.match(r) === null) {
                        isVisible = false;
                        return;
                    }
                } else if (building[filter.uniqueKey] < filter.value) {
                    isVisible = false;
                    return;
                }

            });
            building.visible = isVisible;
        });
    }
}

export default BuildingStore;
