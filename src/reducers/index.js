/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

//import {List, Map} from 'immutable';
import {combineReducers} from 'redux';

import filter from './filter';
import places from './places';

const initialMainState = {
    //curHistoryRoute: '/',
    //prevHistoryRoute: '/',
    rootDomId: 'react',
    searchSubmitted: false,
    showWelcomeMessage: true,
    sidebarIsVisible: true,
    resultsStart: 0,
    resultsLimit: 10,
    isSmallDisplay: false,
};

const main = (state = initialMainState, action) => {
    switch (action.type) {
    /*case 'CUR_HISTORY_ROUTE':
        return Object.assign({}, state, {
            curHistoryRoute: action.key,
        });
    case 'PREV_HISTORY_ROUTE':
        return Object.assign({}, state, {
            prevHistoryRoute: action.key,
        });*/
    case 'UPDATE_MAIN_STATE':
        const newObj = {};
        newObj[action.key] = action.value;
        return Object.assign({}, state, newObj);
    case 'TOGGLE_SIDEBAR':
        return Object.assign({}, state, {
            sidebarIsVisible: ! state.sidebarIsVisible,
        });
    case 'TOGGLE_WELCOME_MSG':
        return Object.assign({}, state, {
            showWelcomeMessage: ! state.showWelcomeMessage,
        });
    default:
        return state;
    }
};

const initialStoreState = {
    connected: false,
    places: []
};

const store = (state = initialStoreState, action) => {
    switch (action.type) {
    case 'STORE_REQUEST':
        return Object.assign({}, state, {
            connected: false,
        });
    case 'STORE_RECEIVE':
        const placesData = [];
        for (const key in action.payload) {
            /*const place = action.payload[key];
            place.id = key;
            placesData.push(place);*/
            placesData.push({
                id: key,
                lat: action.payload[key].latitude,
                lng: action.payload[key].longitude,
                titel: action.payload[key].titel,
                kategorie: action.payload[key].kategorie,
            });
        }
        return Object.assign({}, state, {
            connected: true,
            places: placesData
        });
    case 'STORE_FAILURE':
        return Object.assign({}, state, {
            connected: false,
            error: action.payload
        });

    default:
        return state;
    }
};

const initialMapConfig = {
    //51.339695, 12.373075
    center: {
        lat: 51.3412,
        lng: 12.3747
    },
    zoom: 13,
    bounds: {
        _northEast: {lat: 0, lng: 0},
        _southWest: {lat: 0, lng: 0}
    }
};

const mapConfig = (state = initialMapConfig, action) => {
    switch (action.type) {
    case 'MAP_CONFIG':
        return Object.assign({}, state, {
            center: action.payload.center === undefined ? state.center : action.payload.center,
            zoom: action.payload.zoom === undefined ? state.zoom : action.payload.zoom,
            bounds: action.payload.bounds === undefined ? state.bounds : action.payload.bounds
        });
    case 'MAP_ZOOM':
        return Object.assign({}, state, {
            zoom: action.payload.zoom
        });
    case 'MAP_CENTER':
        return Object.assign({}, state, {center: {
            lat: action.payload.lat,
            lng: action.payload.lng
        }});
    case 'MAP_BOUNDS':
        return Object.assign({}, state, {bounds: {
            _northEast: action.payload._northEast,
            _southWest: action.payload._southWest
        }});
    default:
        return state;
    }
};

const buildingNavigator = combineReducers({
    main,
    filter,
    store,
    places,
    map: mapConfig,
});

export default buildingNavigator;
