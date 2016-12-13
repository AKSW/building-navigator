/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */
/*eslint max-params: ["error", 3]*/

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import Search from '../components/Search';
import {
    setFilter,
    updateMainState,
    requestPlaces,
    updateMapCenter,
    updateMapZoom
} from '../actions';

const getActiveOptions = (filter, key) => {
    return filter[key].value.filter((option) => {
        return option.active;
    });
};

const getSelectedOptions = (el) => {
    return [].filter.call(el.options, function(o) {
        return o.selected;
    }).map(function(o) {
        return o.value;
    });
};

const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter,
        doRequest: state.places.doRequest,
        selectedDistrict: getActiveOptions(state.filter, 'district')[0],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (filter, key) => {
            const el = ReactDOM.findDOMNode(filter[key].node);

            if (key === 'district') {
                const value = getSelectedOptions(el)[0];
                dispatch(setFilter('district', {active: true, value}));
                const activeDist = getActiveOptions(filter, 'district')[0];
                //console.log(getActiveOptions(filter, 'district')[0]);
                dispatch(updateMapCenter({lat: activeDist.lat, lng: activeDist.lng}));
                dispatch(updateMapZoom({zoom: 15}));
            }
            else if (key === 'search') {
                const active = el.value === '' ? false : true;
                dispatch(setFilter('search', {active, value: el.value.trim()}));
            }
            else if (key === 'evlevatorAll') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: false}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: false}));
            }
            else if (key === 'elevatorCabineIsAvailable') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: true}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: false}));
            }
            else if (key === 'elevatorIsWheelchairAccessible') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: false}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: true}));
            }
        },
        onSubmit: (e, filter) => {
            e.preventDefault();
            dispatch(updateMainState('searchSubmitted', true));
            dispatch(requestPlaces()).then(
                response => {
                    hashHistory.push('/results');
                }
            );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

