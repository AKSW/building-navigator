/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Results from '../components/Results';
import {
    updateMapCenter,
    setMapZoom,
    setSelectedPlace,
    toggleDetails,
    requestPlaceDetails,
    updateSelectedPlaceId
} from '../actions';
import {mapMaxZoom} from './MapContainer';

const mapStateToProps = (state, ownProps) => {
    let activeFilter = 0;
    const placesAccessAttr = [];

    /*placesAccessAttr = state.places.places.map((place) => {
        let placeAccessAttr = 0;
        for (const key in state.filter) {
            if (place.hasOwnProperty(key) &&
                place[key].value === 'yes'
            ) {
                placeAccessAttr++;
            }
        }
        return placeAccessAttr;
    });*/

    for (const key in state.filter) {
        if (key !== 'search' &&
            state.filter[key].active
        ) {
            activeFilter++;
        }
    }

    return {
        places: state.places.places,
        placesAccessAttr,
        filter: state.filter,
        activeFilter,
        doRequest: state.places.doRequest,
        doDetailsRequest: state.places.doDetailsRequest
    };
};

const mapDispatchToProps = (dispatch) => {
    /** @todo may request places (if state.places is emtpy */
    return {
        onClickResult: (e, place) => {
            e.preventDefault();
        },
        onClickShowOnMap: (e, place) => {
            dispatch(updateMapCenter({
                lat: parseFloat(place.lat.value),
                lng: parseFloat(place.lng.value)
            }));
            dispatch(setMapZoom({zoom: mapMaxZoom()}));
            dispatch(updateSelectedPlaceId(place.id.value));
            dispatch(setSelectedPlace(place));
            e.preventDefault();
        },
        toggleDetails: (place) => {
            if (!place._UI.receivedDetails
            ) {
                dispatch(requestPlaceDetails(place.uri.value)).then(
                    response => {
                        dispatch(toggleDetails(place.uri.value));
                    }
                );
            } else {
                dispatch(toggleDetails(place.uri.value));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);

