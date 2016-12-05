/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

//import {List, Map} from 'immutable';
import {combineReducers} from 'redux';

import filter from './filter';
import places from './places';

const initialMainState = {
    //curHistoryRoute: '/',
    //prevHistoryRoute: '/',
    showWelcomeMessage: true,
    sidebarIsVisible: true,
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

/*const initialRdfstoreState = {
    connected: false
};

const rdfstore = (state = initialRdfstoreState, action) => {
    switch (action.type) {
    case 'STORE_REQUEST':
        return Object.assign({}, state, {
            connected: false,
        });
    case 'STORE_RECEIVE':
        return Object.assign({}, state, {
            connected: true
        });
    case 'STORE_FAILURE':
        return Object.assign({}, state, {
            connected: false,
            error: action.payload
        });

    default:
        return state;
    }
};*/

const initialMapConfig = {
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
    //rdfstore,
    places,
    map: mapConfig,
});

export default buildingNavigator;
