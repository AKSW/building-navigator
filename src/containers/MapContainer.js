/**
  * Container of the map
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import Map from '../components/Map';
import {requestPlaces} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        requestPlaces: state.places.doRequest,
        places: state.places.places,
        mapConfig: state.map,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePlaces: () => {
            dispatch(requestPlaces());
        },
        onClickMarker: (e, place) => {
        },
        onClickShowDetails: (place) => {
            console.log('Place-Details: ', place);
            console.log('Goto: ', `/place/${place.name.value}`);
            hashHistory.push(`/place/${place.name.value}`);
            //hashHistory.goBack();
        },
        onZoomend: () => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
