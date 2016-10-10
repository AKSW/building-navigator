/*eslint-disable no-console */
/*eslint max-nested-callbacks: ["error", 5]*/
/*eslint max-len: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-trailing-spaces: 0*/

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import MapMarkers from '../components/MapMarkers';
import {getPlace} from '../actions';

const VisibleMarkers = ({onClickMarker}) => {
    console.log(onClickMarker);

    return (
        <MapMarkers markers={[]} onClickMarker={onClickMarker} />        
    );
};

const getVisibleMarkers = (places) => {
    return places;
};

const mapStateToProps = (state) => {
    return {
        markers: getVisibleMarkers(state.places),
        /*onClickMarker: (id) => {
            console.log(state.places[id]);
            //dispatch(getPlace(id));
        }*/
    };
};

/*const mapDispatchToProps = (dispatch) => {
    return {
    };
};*/

export default connect(mapStateToProps)(MapMarkers);
//export default connect()(VisibleMarkers);
