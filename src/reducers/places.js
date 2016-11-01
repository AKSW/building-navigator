/*eslint-disable no-console */

const initialPlacesState = {
    doRequest: false,
    places: [],
    selectedPlace: {}
};

const places = (state = initialPlacesState, action) => {
    //const [ requestType, successType, failureType ] = types;
    switch (action.type) {
    /*
    case 'ADD_PLACES':
        return [
            ...state,
            ...action.payload
        ];
    */
    case 'PLACES_REQUEST':
        return Object.assign({}, state, {
            doRequest: true,
        });
    case 'PLACES_RECEIVE':
        return Object.assign({}, state, {
            doRequest: false,
            places: action.payload
        });
    case 'PLACES_FAILURE':
        /*console.log('REDUCER: ', action);
        return state;*/
        return Object.assign({}, state, {
            doRequest: false,
            error: '...'
        });

    default:
        return state;
    }
};

export default places;
