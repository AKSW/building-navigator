/*eslint-disable no-console */

import {combineReducers} from 'redux';
import places from './places';

/*const buildingNavigator = (state, action) => {
    if (state === undefined) {
        state = [];
    }
    switch (action.type) {
    case 'ADD_PLACES':
        console.log('Add Place:', action.payload);
        //return state.set('places', action.payload);
        state.push(action.payload);
        return state;
    default:
        return state;
    }
};

export default buildingNavigator;*/

const buildingNavigator = combineReducers({
    places
});

export default buildingNavigator;
