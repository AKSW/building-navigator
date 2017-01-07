/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import 'whatwg-fetch';

const dataDir = () => {
    return 'https://raw.githubusercontent.com/AKSW/transform-bvl-csv-to-json-files/master/result/';
};

const initStoreFile = () => {
    return '/building-coordinates.json';
};

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
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
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
            lat2: a.latitude,
            lng2: a.longitude
        });
        const distB = getDistance({
            lat1: lat,
            lng1: lng,
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
    return places;
};

export const filterPlaces = (places, filter) => {
    const filterMatches = [];

    // create filterMatch array with activated filters from state
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

    // check if place matches the filter
    const placeMatchFilter = (place, fi) => {
        if (!place.hasOwnProperty(fi.key)) {
            return false;
        }
        if (typeof place[fi.key] === 'number') {
            return place[fi.key] === fi.value;
        }
        const r = new RegExp(fi.value, "i");
        return place[fi.key].match(r) === null ? false : true;
    };

    if (filterMatches.length > 0) {
        places = places.filter(place => {
            for (const midx in filterMatches) {
                if (false === placeMatchFilter(place, filterMatches[midx])) {
                    return false;
                }
            }
            return true;
        });
    }

    return places;
};

const slicePlaces = (state = {}, places = []) => {
    return places.slice(state.main.resultsStart, state.main.resultsLimit);
};

export const getPlaces = (state = {}) => {
    let list = sortPlacesByDistToLoc({
        places: state.store.places,
        lat: state.map.center.lat,
        lng: state.map.center.lng
    });
    list = filterPlaces(list, state.filter);
    list = slicePlaces(state, list);

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
