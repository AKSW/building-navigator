/*eslint-disable no-console */
/*eslint-disable camelcase */

const initialPlacesState = {
    doRequest: false,
    doDetailsRequest: false,
    places: [],
    //selectedPlace: {},
    selectedPlaceId: undefined,
    scrollToSelectedPlace: false,
};

const initialPlaceState = {
    _UI: {
        showDetails: false,
        //receivedDetails: false,
        a11yRating: 0.00,
        resultsListNode: null
    },
    /*id: 'id',
    title: 'titel',
    hasElevator: 'personenaufzug_vorhanden',
    elevatorIsAccessible: '',*/
};

const a11yProps = () => {
    return [
        'eingangsbereich_rollstuhlgerecht',
        'personenaufzug_rollstuhlgerecht',
        'toilette_rollstuhlgerecht',
    ];
};

const sortPlacesByA11yRating = (a, b) => {
    if (a._UI.a11yRating > b._UI.a11yRating) {
        return -1;
    }
    if (a._UI.a11yRating < b._UI.a11yRating) {
        return 1;
    }
    return 0;
};

/** @todo add place state */
/** @todo add all initial props */
/** @todo write place.prop.value to place.prop */
/** @todo change 'ja|nein' value to boolean */

const placeReducer = (state = initialPlaceState, action) => {
    switch (action.type) {
    case 'PLACE_RECEIVE':
        const place = Object.assign({}, initialPlaceState, action.place);
        let a11yRating = 0.00;
        // sort places by accessible rating
        a11yProps().forEach(accProp => {
            if (!place.hasOwnProperty(accProp)) {
                return;
            }
            if (place[accProp] === 'ja' ||
                place[accProp] === 'vollständig'
            ) {
                a11yRating = a11yRating + 1.00;
            }
            if (place[accProp] === 'teilweise') {
                a11yRating = a11yRating + 0.01;
            }
        });
        place._UI = Object.assign({}, initialPlaceState._UI, {a11yRating});

        // bugfix https://github.com/AKSW/transform-bvl-csv-to-json-files/issues/2
        if (place.personenaufzug_rollstuhlgerecht === 'ja') {
            place.personenaufzug_vorhanden = 'ja';
        }
        console.log('a11yRating of', place, place._UI.a11yRating);
        /*const newPlace = {
            id: place.id,
            title: place.titel,
            hasElevator: null,

        };*/
        return place;
    default:
        return state;
    }
};

const places = (state = initialPlacesState, action) => {
    if (action.type !== 'SCROLL_TO_SELECTED_PLACE') {
        state.scrollToSelectedPlace = false;
    }
    switch (action.type) {
    case 'PLACES_REQUEST':
        return Object.assign({}, state, {
            doRequest: true,
        });
    case 'PLACES_RECEIVE':
        const receivedPlaces = action.payload.map((plc) => {
            return placeReducer(undefined, {type: 'PLACE_RECEIVE', place: plc});
            //return Object.assign({}, initialPlaceState, plc);
        });
        receivedPlaces.sort(sortPlacesByA11yRating);
        return Object.assign({}, state, {
            doRequest: false,
            places: receivedPlaces
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
                if (place.id !== action.payload) {
                    return place;
                }
                return Object.assign({}, place, {
                    _UI: {
                        showDetails: !place._UI.showDetails
                    }
                });
            })
        });
    case 'SHOW_DETAILS':
        return Object.assign({}, state, {
            places: state.places.map((place) => {
                if (place.id !== action.payload) {
                    return place;
                }
                return Object.assign({}, place, {
                    _UI: {
                        showDetails: true
                    }
                });
            })
        });
    case 'SORT_PLACES_BY_ACCESSIBLE_RATING':
        console.log('SORT_PLACES_BY_ACCESSIBLE_RATING: ', action);
        return state;
    case 'SCROLL_TO_SELECTED_PLACE':
        return Object.assign({}, state, {
            scrollToSelectedPlace: true
        });
    default:
        return state;
    }
};

export default places;
