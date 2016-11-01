/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

//import {List, Map} from 'immutable';
import {combineReducers} from 'redux';
import filter from './filter';
import places from './places';

const initialRdfstoreState = {
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
            error: '...'
        });

    default:
        return state;
    }
};

/*const selectedPlace = (state = {}, action) => {
    switch (action.type) {
    case 'SELECTED_PLACE':
        //console.log('SELECTED_PLACES', state, action);
        return action.payload;
    default:
        return state;
    }
};*/

const initialMapConfig = {
    lat: 51.3412,
    lng: 12.3747,
    zoom: 13
};

const mapConfig = (state = initialMapConfig, action) => {
    switch (action.type) {
    case 'MAP_CONFIG':
        console.log('MAP_CONFIG, state:', state, ' action:', action);
        return Object.assign({}, state, {
            lat: action.payload.lat === null ? state.lat : action.payload.lat,
            lng: action.payload.lng === null ? state.lng : action.payload.lng,
            zoom: action.payload.zoom === null ? state.zoom : action.payload.zoom
        });
    default:
        return state;
    }
};

/*const sparql = (state = null, action) => {
    switch (action.type) {
    case 'SPARQL_REQUEST':
        console.log('REDUCER: SPARQL_REQUEST, state:', state, ' action:', action);
        //return Object.assign({}, state, {palyload});
        return action.payload;
    default:
        return state;
    }
};*/

const buildingNavigator = combineReducers({
    filter,
    rdfstore,
    places,
    //selectedPlace,
    map: mapConfig,
    //sparql
});

export default buildingNavigator;
