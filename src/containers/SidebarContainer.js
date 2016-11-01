/**
  * Container for the filter sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import Sidebar from '../components/Sidebar';
import {setFilter, requestPlaces} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        'lift-liftWithWheelChairSupportAvailable': state.filter['lift-liftWithWheelChairSupportAvailable'].active
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (key, value) => {
            dispatch(setFilter(key, value));
            dispatch(requestPlaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
