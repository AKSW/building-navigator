/*eslint-disable no-console */

const initialPlacesState = {
    doRequest: false,
    places: [],
    selectedPlace: {}
};

const initialPlaceState = {
    _UI: {
        showDetails: false,
    }
};

const places = (state = initialPlacesState, action) => {
    switch (action.type) {
    case 'PLACES_REQUEST':
        return Object.assign({}, state, {
            doRequest: true,
        });
    case 'PLACES_RECEIVE':
        const plcs = action.payload.map((plc) => {
            return Object.assign({}, initialPlaceState, plc);
        });
        return Object.assign({}, state, {
            doRequest: false,
            places: plcs
        });
    case 'PLACES_FAILURE':
        return Object.assign({}, state, {
            doRequest: false,
            error: action.payload
        });
    case 'SELECTED_PLACE':
        return Object.assign({}, state, {
            selectedPlace: action.payload
        });
    case 'TOGGLE_DETAILS':
        return Object.assign({}, state, {
            places: state.places.map((place) => {
                if (place.uri.value !== action.payload) {
                    return place;
                }
                return Object.assign({}, place, {
                    _UI: {showDetails: !place._UI.showDetails}
                });
            })
        });
    default:
        return state;
    }
};

export default places;
