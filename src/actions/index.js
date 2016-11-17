/*eslint-disable no-console */

import {CALL_API} from '../middleware/api';

export const setFilter = (key, payload = {active: true, value: undefined}) => {
    return {
        type: 'SET_FILTER',
        key,
        active: payload.active,
        value: typeof payload.value === 'undefined' ? undefined : payload.value
    };
};

export const STORE_REQUEST = 'STORE_REQUEST';
export const STORE_RECEIVE = 'STORE_RECEIVE';
export const STORE_FAILURE = 'STORE_FAILURE';

export const setupStore = () => {
    return {
        [CALL_API]: {
            type: 'REQUEST_STORE',
            types: [STORE_REQUEST, STORE_RECEIVE, STORE_FAILURE]
        }
    };
};

export const PLACES_REQUEST = 'PLACES_REQUEST';
export const PLACES_RECEIVE = 'PLACES_RECEIVE';
export const PLACES_FAILURE = 'PLACES_FAILURE';

export const requestPlaces = () => {
    return {
        [CALL_API]: {
            type: 'REQUEST_PLACES',
            types: [PLACES_REQUEST, PLACES_RECEIVE, PLACES_FAILURE],
        }
    };
};

export const PLACE_DETAILS_REQUEST = 'PLACE_DETAILS_REQUEST';
export const PLACE_DETAILS_RECEIVE = 'PLACE_DETAILS_RECEIVE';
export const PLACE_DETAILS_FAILURE = 'PLACE_DETAILS_FAILURE';

export const requestPlaceDetails = (placeUri) => {
    return {
        [CALL_API]: {
            type: 'REQUEST_PLACE_DETAILS',
            types: [PLACE_DETAILS_REQUEST, PLACE_DETAILS_RECEIVE, PLACE_DETAILS_FAILURE],
            payload: placeUri
        }
    };
};

/*export const addPlaces = (places) => {
    console.log('ADD_PLACES', places);
    return {
        type: 'ADD_PLACES',
        payload: places
    };
};*/

/*export const changedMapView = () => {
    console.log('Changed Map view action...');
    return {
        type: 'ANYTHING'
    };
};*/

/*export const getPlace = (id) => {
    return {
        type: 'GET_PLACE',
        payload: id
    };
};*/

/**
 Show or hide the details of a place in results list by its URI
 @param {String} placeUri URI of the place
 @returns {Object} Result object
*/
export const toggleDetails = (placeUri) => {
    return {
        type: 'TOGGLE_DETAILS',
        payload: placeUri
    };
};

export const setSelectedPlace = (place) => {
    return {
        type: 'SELECTED_PLACE',
        payload: place
    };
};

export const setMapZoom = ({zoom}) => {
    return {
        type: 'MAP_CONFIG',
        payload: {lat: null, lng: null, zoom}
    };
};

export const setMapCoord = ({lat, lng}) => {
    return {
        type: 'MAP_COORD',
        payload: {lat, lng}
    };
};
