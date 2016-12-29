/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import 'whatwg-fetch';

const dataDir = () => {
    return 'http://asimeon.de/building-navigator/data';
    //return '/data';
};

const initStoreFile = () => {
    return '/sample-building-coordinates.json';
};

/*const remoteUrl = () => {
    return 'http://localhost:8890/sparql';
};

export const request = (query) => {
    const fd = new FormData();
    fd.append('query', query);
    fd.append('format', 'application/json');

    return new Promise(
        function(resolve, reject) {
            fetch(remoteUrl(), {
                method: 'POST',
                body: fd
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                resolve(json.results.bindings);
            }).catch(function(ex) {
                reject(ex);
            });
        }
    );
};*/

const loadJson = (file) => {
    return new Promise(
        (resolve, reject) => {
            fetch(dataDir() + file, {
                /*mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }*/
            })
            .then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((ex) => {
                reject(ex);
            });
        }
    );
};

export const initStore = () => {
    return loadJson(initStoreFile());
};

export const getPlaceById = (placeID) => {
    return loadJson(`/buildings/${placeID}.json`);
};

export const getDistance = ({lat1, lng1, lat2, lng2}) => {
    /*const d = (
        Math.pow(Math.abs(parseFloat(place.lng.value) - marker.lng), 2) +
        Math.pow(Math.abs(parseFloat(place.lat.value) - marker.lat), 2)
    );

    return Math.sqrt(d);*/
    const R = 6371;  // radius of the earth in km
    const x = (lng2 - lng1) * Math.cos(0.5 * (lat2 + lat1));
    const y = lat2 - lat1;
    const d = R * Math.sqrt(x * x + y * y);
    return d;
};

export const sortPlacesByDistToLoc = ({places, lat, lng}) => {
    places.sort((a, b) => {
        const distA = getDistance({
            lat1: lat,
            lng1: lng,
            lat2: a.lat,
            lng2: a.lng
        });
        const distB = getDistance({
            lat1: lat,
            lng1: lng,
            lat2: b.lat,
            lng2: b.lng
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
    return places;
};

export const filterPlaces = (places, filter) => {
    const filterMatches = [];

    const createFilterMatches = (fi) => {
        for (const fkey in fi) {
            const filterType = typeof fi[fkey].filter;
            /** @todo we dont need the 'active' flag, filterType and null value might engough! */
            if (filterType === 'string' &&
                fi[fkey].active
            ) {
                filterMatches.push({
                    key: fi[fkey].filter,
                    value: fi[fkey].value
                });
            }
            if (filterType === 'object') {
                createFilterMatches(fi[fkey].value);
            }
        }
    };
    createFilterMatches(filter);

    console.log('filterMatches: ', filterMatches);

    const placeMatchesFilter = (place) => {
        let matches = true;
        for (const midx in filterMatches) {
            const r = new RegExp(filterMatches[midx].value, "i");
            if (!place.hasOwnProperty(filterMatches[midx].key) ||
                !place[filterMatches[midx].key].match(r)
            ) {
                matches = false;
            }
        }
        return matches;
    };

    if (filterMatches.length > 0) {
        places = places.filter(place => {
            return placeMatchesFilter(place);
        });
    }

    return places;
};

const getMaxLimitPlaces = (state = {}, places = []) => {
    return places.slice(state.main.resultsStart, state.main.resultsLimit);
};

export const getPlaces = (state = {}) => {
    let list = sortPlacesByDistToLoc({
        places: state.store.places,
        lat: state.map.center.lat,
        lng: state.map.center.lng
    });
    list = filterPlaces(list, state.filter);
    list = getMaxLimitPlaces(state, list);

    const PlacesDetailsPromises = list.map((place) => {
        return getPlaceById(place.id).then(
            response => {
                return response;
            },
            error => {
                console.error(error, error);
                throw new Error(error);
            }
        );
    });

    return Promise.all(PlacesDetailsPromises).then(values => {
        return values;
    }).catch(reason => {
        /** @todo test error case */
        throw new Error(reason);
    });
};
