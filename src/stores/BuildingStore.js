import Promise from 'promise-polyfill';
import HttpRequest from '../utils/HttpRequest';
import {getDistance} from '../utils/GeoUtils';
import {getGraphUri, getPrefix} from '../utils/RDF';
import LocalCache from '../utils/LocalCache';

/**
 * Stores all buildings
 *
 * Init all initial buildings data and load all data of a building
 * Applies filter and map-boundings to buildings (flag building.visible)
 */
class BuildingStore {
    constructor(logger) {
        this.logger = logger;

        // flag if all buildings are initiated
        this.initiated = false;

        // init empty building array
        this.buildings = [];
        // default properties for each building
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
        // http request interface to the triple store
        this.httpRequest = new HttpRequest();
        // local cache class
        this.localCache = new LocalCache();
    }

    /**
     * Init all buildings data
     *
     * @return Promise, length of added buildings
     * @throws Error
     */
    initAll() {
        const self = this;
        // sparql query to gel all buildings and some properties
        const query = `SELECT ?id ?category ?title ?latitude ?longitude
            ?entranceSuitableForWheelchairs
            ?elevatorDoorWidth ?elevatorSuitableForWheelchairs
            ?toiletDoorWidth ?toiletSuitableForWheelchairs
            ?parkingLotOnSiteAvailable
            ?numberOfSlotsDisabledParkingLotInFrontOfPlace
            ?numberOfSlotsDisabledParkingLotOnSite
            ?generalHelp
            ?supportForHearingImpairedAvailable
            ?supportForVisuallyImpairedAvailable
        FROM <${getGraphUri()}>
        WHERE {
            ?uri rdf:type <${getPrefix('place')}Place> ;
                <http://purl.org/dc/terms/identifier> ?id ;
                <http://dbpedia.org/ontology/category> ?category ;
                <http://purl.org/dc/elements/1.1/title> ?title ;
                <http://www.w3.org/2003/01/geo/lat> ?latitude ;
                <http://www.w3.org/2003/01/geo/long> ?longitude ;
                # parking
                <${getPrefix('placeacess')}numberOfSlotsDisabledParkingLotInFrontOfPlace> ?numberOfSlotsDisabledParkingLotInFrontOfPlace ;
                <${getPrefix('placeacess')}numberOfSlotsDisabledParkingLotOnSite> ?numberOfSlotsDisabledParkingLotOnSite ;
                <${getPrefix('place')}parkingLotOnSiteAvailable> ?parkingLotOnSiteAvailable ;
                # entrance
                <${getPrefix('placeacess')}entranceSuitableForWheelchairs> ?entranceSuitableForWheelchairs ;
                # lift
                <${getPrefix('placeacess')}elevatorSuitableForWheelchairs> ?elevatorSuitableForWheelchairs ;
                <http://semweb.mmlab.be/ns/wa#elevatorDoorWidth> ?elevatorDoorWidth ;
                # toilet
                <http://semweb.mmlab.be/ns/wa#toiletDoorWidth> ?toiletDoorWidth ;
                <${getPrefix('placeacess')}toiletSuitableForWheelchairs> ?toiletSuitableForWheelchairs ;
                # etc help
                <${getPrefix('placeacess')}localSupport> ?localSupport ;
                <${getPrefix('placeacess')}supportForHearingImpairedAvailable> ?supportForHearingImpairedAvailable ;
                <${getPrefix('placeacess')}supportForVisuallyImpairedAvailable> ?supportForVisuallyImpairedAvailable .
            # bind local support to true/false reduces data
            BIND (
                IF((?localSupport = ""), "false", "true")
                as ?generalHelp
            )
        }`;

        // get acc-value from sparql property
        const getAcc = (str) => {
            if (str === "fully") {
                return 2;
            }
            else if (str === "partly" || str === "true") {
                return 1;
            }
            else {
                return 0;
            }
        };

        // private fct to add all buildings to this.buildings
        const addAll = (buildings) => {
            buildings.forEach((building) => {
                const tmp = Object.assign({}, this.buildingDefaults, {
                    id:                             building.id.value,
                    title:                          building.title.value,
                    latitude:                       parseFloat(building.latitude.value),
                    longitude:                      parseFloat(building.longitude.value),
                    category:                       building.category.value,
                    "entrance-suit-f-wheelchair":   getAcc(building.entranceSuitableForWheelchairs.value),
                    "lift-suit-f-wheelchair":       getAcc(building.elevatorSuitableForWheelchairs.value),
                    "lift-avail":                   (parseInt(building.elevatorDoorWidth.value) > 0 || getAcc(building.elevatorSuitableForWheelchairs.value) > 0) ? 1 : 0,
                    "toilet-avail":                 (parseInt(building.toiletDoorWidth.value) > 0 || getAcc(building.toiletSuitableForWheelchairs.value) > 0) ? 1 : 0,
                    "toilet-suit-f-wheelchair":     getAcc(building.toiletSuitableForWheelchairs.value),
                    "parking-avail":                (getAcc(building.parkingLotOnSiteAvailable.value) > 0 ||
                                                     parseInt(building.numberOfSlotsDisabledParkingLotInFrontOfPlace.value) > 0 ||
                                                     parseInt(building.numberOfSlotsDisabledParkingLotOnSite.value) > 0
                                                    ) ? 1 : 0,
                    "parking-f-disabled-avail":     (parseInt(building.numberOfSlotsDisabledParkingLotInFrontOfPlace.value) > 0 ||
                                                     parseInt(building.numberOfSlotsDisabledParkingLotOnSite.value) > 0
                                                    ) ? 1 : 0,
                    "help-for-hearing-imp":         getAcc(building.supportForHearingImpairedAvailable.value),
                    "help-for-blind":               getAcc(building.supportForVisuallyImpairedAvailable.value),
                    "general-help":                 getAcc(building.generalHelp.value)
                });
                tmp.a11yRating = self.getA11yRating(tmp);
                self.buildings.push(tmp);
            });
            self.buildings.sort((a, b) => {
                if (a.a11yRating > b.a11yRating) return -1;
                if (a.a11yRating < b.a11yRating) return 1;
                return 0;
            });
            return self.buildings.length;
        };

        // may get from cache (localStore)
        const cachedBuildings = this.localCache.get("buildings");
        if (cachedBuildings !== null && cachedBuildings.length > 0) {
            const added = addAll(cachedBuildings);
            if (added == 0) {
                throw new Error('No buildings initiated');
            }
            self.initiated = true;
            return new Promise((resolve) => {resolve(cachedBuildings.length)});
        }

        // new sparql http request to triple store
        return this.httpRequest.request(query)
            .then(function (response) {
                const added = addAll(response.data.results.bindings);
                if (added == 0) {
                    throw new Error('No buildings initiated');
                }
                self.initiated = true;
                // add to local cache
                self.localCache.set("buildings", response.data.results.bindings);
                return added;
            })
            .catch(function (error) {
                throw new Error(error);
            });
    }

    /**
     * Load data of a building and save to building.data
     *
     * @param {String} Id of building
     * @return Promise, true if buildings-data loaded
     * @throws Error
     */
    loadBuildingData(id) {
        const self = this;
        // sparql query to get a building and all its properties
        const query = `SELECT ?p ?o
        FROM <${getGraphUri()}>
        WHERE {
            ?uri <http://purl.org/dc/terms/identifier> "${id}" ;
            ?p ?o
        }`;

        // fct to load properties to the building.data
        const load = (buildingData) => {
            const building = this.getBuilding(id);
            if (building === undefined) {
                return false;
            }
            building.data = {};
            buildingData.forEach((entry) => {
                switch (entry.p.value) {
                    case 'http://purl.org/dc/terms/identifier':
                        building.data.id = entry.o.value;
                        break;
                    case 'http://purl.org/dc/elements/1.1/title':
                        building.data.titel = entry.o.value;
                        break;
                    case 'http://dbpedia.org/ontology/category':
                        building.data.kategorie = entry.o.value;
                        break;
                    case getPrefix('geo') + 'lat':
                        building.data.latitude = parseFloat(entry.o.value);
                        break;
                    case getPrefix('geo') + 'long':
                        building.data.longitude = parseFloat(entry.o.value);
                        break;
                    case 'http://schema.org/addressLocality':
                        building.data.ort = entry.o.value;
                        break;
                    case 'http://schema.org/streetAddress':
                        building.data.strasse = entry.o.value;
                        break;
                    case 'http://schema.org/postalCode':
                        building.data.plz = entry.o.value;
                        break;
                    case getPrefix('place') + 'openingHours':
                        building.data.oeffnungszeiten = entry.o.value;
                        break;

                    case getPrefix('placeacess') + 'localSupport':
                        building.data.beschreibung_hilfestellungen_vor_ort = entry.o.value;
                        break;
                    case getPrefix('placeacess') + 'supportForHearingImpairedAvailable':
                        building.data.besondere_hilfestellungen_f_menschen_m_hoerbehinderung_vorhanden = entry.o.value;
                        break;
                    case getPrefix('placeacess') + 'supportForVisuallyImpairedAvailable':
                        building.data.besondere_hilfestellungen_f_menschen_m_seebhind_blinde_vorhanden = entry.o.value;
                        break;
                    default:
                        // save all other properties with the hash of the uri
                        const keyUrl = new URL(entry.p.value);
                        building.data[keyUrl.hash.substr(1)] = entry.o.value;
                }
            });
            return true;
        }

        // may get from cache (localStore)
        const cachedBuilding = this.localCache.get(id);
        if (cachedBuilding !== null) {
            const loaded = load(cachedBuilding);
            if (loaded == false) {
                throw new Error(`Couldnt find building data with id "${id}"`);
            }
            return new Promise((resolve) => {resolve(loaded)});
        }

        // new sparql http request to the triple store
        return this.httpRequest.request(query)
            .then(function (response) {
                const loaded = load(response.data.results.bindings);
                if (loaded == false) {
                    throw new Error(`Couldnt find building data with id "${id}"`);
                }
                // add to local cache
                self.localCache.set(id, response.data.results.bindings);
                return loaded;
            })
            .catch(function (error) {
                throw new Error(error);
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
