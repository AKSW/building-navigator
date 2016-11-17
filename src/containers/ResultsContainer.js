/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Results from '../components/Results';
import {setMapCoord, setSelectedPlace, toggleDetails} from '../actions';

const mapStateToProps = (state, ownProps) => {
    let activeFilter = 0;
    let placesAccessAttr = [];

    placesAccessAttr = state.places.places.map((place) => {
        let placeAccessAttr = 0;
        Object.keys(state.filter).forEach((key) => {
            if (place.hasOwnProperty(key) &&
                place[key].value === 'yes'
            ) {
                placeAccessAttr++;
            }
        });
        return placeAccessAttr;
    });

    Object.keys(state.filter).forEach((key) => {
        if (key !== 'search' &&
            state.filter[key].active
        ) {
            activeFilter++;
        }
    });

    return {
        places: state.places.places,
        placesAccessAttr,
        filter: state.filter,
        activeFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickResult: (place) => {
            dispatch(setSelectedPlace(place));
            dispatch(setMapCoord({
                lat: parseFloat(place.lat.value),
                lng: parseFloat(place.lng.value)
            }));
        },
        onClickDetails: (place) => {
        },
        toggleDetails: (e, place) => {
            dispatch(toggleDetails(place.uri.value));
            e.preventDefault();
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);

