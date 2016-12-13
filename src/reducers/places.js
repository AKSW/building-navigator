/*eslint-disable no-console */

const initialPlacesState = {
    doRequest: false,
    doDetailsRequest: false,
    places: [],
    selectedPlace: {},
    selectedPlaceId: undefined,
};

const initialPlaceState = {
    _UI: {
        showDetails: false,
        receivedDetails: false
    }
};

/** @todo add place state */
/** @todo add all initial props */
/** @todo write place.prop.value to place.prop */
/** @todo change 'ja|nein' value to boolean */

/*const place = (state = initialPlaceState, action) => {
 // ...
};*/

const places = (state = initialPlacesState, action) => {
    switch (action.type) {
    case 'PLACES_REQUEST':
        return Object.assign({}, state, {
            doRequest: true,
        });
    case 'PLACES_RECEIVE':
        return Object.assign({}, state, {
            doRequest: false,
            places: action.payload.map((plc) => {
                return Object.assign({}, initialPlaceState, plc);
            })
        });
    case 'PLACES_FAILURE':
        return Object.assign({}, state, {
            doRequest: false,
            error: action.payload
        });
    case 'PLACE_REQUEST':
        return Object.assign({}, state, {
            doRequest: true,
        });
    case 'PLACE_RECEIVE':
        return Object.assign({}, state, {
            doRequest: false,
            selectedPlace: action.payload.place
        });
    case 'PLACE_FAILURE':
        return Object.assign({}, state, {
            doRequest: false,
            error: action.payload
        });
    case 'PLACE_DETAILS_REQUEST':
        return Object.assign({}, state, {
            doDetailsRequest: true,
        });
    case 'PLACE_DETAILS_RECEIVE':
        return Object.assign({}, state, {
            doDetailsRequest: false,
            places: state.places.map((place) => {
                if (place.uri.value !== action.payload.uri) {
                    return place;
                }
                const rcPlc = action.payload.data;
                rcPlc._UI = {receivedDetails: true};
                return Object.assign({}, place, rcPlc);
            })
        });
    case 'PLACE_DETAILS_FAILURE':
        return Object.assign({}, state, {
            doDetailsRequest: false,
            error: action.payload
        });
    case 'SELECTED_PLACE':
        return Object.assign({}, state, {
            selectedPlace: action.payload
        });
    case 'SELECTED_PLACE_ID':
        return Object.assign({}, state, {
            selectedPlaceId: action.payload
        });
    case 'TOGGLE_DETAILS':
        return Object.assign({}, state, {
            places: state.places.map((place) => {
                if (place.uri.value !== action.payload) {
                    return place;
                }
                //place._UI.showDetails = !place._UI.showDetails
                const newUI = place._UI;
                newUI.showDetails = !place._UI.showDetails;
                return Object.assign({}, place, newUI);
            })
        });
    default:
        return state;
    }
};

export default places;
