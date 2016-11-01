/*eslint-disable no-console */

import {CALL_API} from '../middleware/api';

export const setFilter = (key, payload) => {
    return {
        type: 'SET_FILTER',
        key,
        payload
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

export const addPlaces = (places) => {
    console.log('ADD_PLACES', places);
    return {
        type: 'ADD_PLACES',
        payload: places
    };
};

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

export const selectedPlace = (place) => {
    return {
        type: 'SELECTED_PLACE',
        payload: place
    };
};

//export const setMapZoom = ({lat, lng, zoom}) => {
export const setMapZoom = ({zoom}) => {
    return {
        type: 'MAP_CONFIG',
        payload: {lat: null, lng: null, zoom}
    };
};
