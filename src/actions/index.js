/*eslint-disable no-console */

import {CALL_API} from '../middleware/api';

export const toggleSidebar = () => {
    return {
        type: 'TOGGLE_SIDEBAR'
    };
};


export const toggleWelcomeMsg = () => {
    return {
        type: 'TOGGLE_WELCOME_MSG'
    };
};

/*export const updateCurHistoryRoute = (key) => {
    return {
        type: 'CUR_HISTORY_ROUTE',
        key,
    };
};

export const updatePrevHistoryRoute = (key) => {
    return {
        type: 'PREV_HISTORY_ROUTE',
        key,
    };
};*/

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

export const PLACE_REQUEST = 'PLACE_REQUEST';
export const PLACE_RECEIVE = 'PLACE_RECEIVE';
export const PLACE_FAILURE = 'PLACE_FAILURE';

export const requestPlaceById = (id) => {
    return {
        [CALL_API]: {
            type: 'REQUEST_PLACE_BY_ID',
            types: [PLACE_REQUEST, PLACE_RECEIVE, PLACE_FAILURE],
            payload: id
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

export const updateSelectedPlaceId = (placeId) => {
    return {
        type: 'SELECTED_PLACE_ID',
        payload: placeId
    };
};

export const updateMapConfig = ({center, zoom, bounds}) => {
    return {
        type: 'MAP_CONFIG',
        payload: {center, zoom, bounds}
    };
};

export const setMapZoom = ({zoom}) => {
    return {
        type: 'MAP_ZOOM',
        payload: {zoom}
    };
};

export const updateMapCenter = ({lat, lng}) => {
    return {
        type: 'MAP_CENTER',
        payload: {lat, lng}
    };
};

export const updateMapBounds = ({_northEast, _southWest}) => {
    return {
        type: 'MAP_BOUNDS',
        payload: {_northEast, _southWest}
    };
};
