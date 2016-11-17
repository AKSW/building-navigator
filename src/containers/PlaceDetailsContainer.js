/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import PlaceDetails from '../components/PlaceDetails';

const mapStateToProps = (state, ownProps) => {
    //console.log('PlaceDetails-State: ', state);
    //console.log('PlaceDetails-ownProps: ', ownProps);
    return {
        //place: ownProps.params.place,
        place: state.places.selectedPlace,
        idx: 1,
        expanded: true,
        //hasHistory: ownProps.params.place === undefined ? false: true
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickResult: () => {
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);

