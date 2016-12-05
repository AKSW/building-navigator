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
import {setFilter, requestPlaces} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter,
        doRequest: state.places.doRequest,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (filterKey, active, node) => {
            const el = ReactDOM.findDOMNode(node);

            //console.log('onChange: ', node, filterKey, el, active);

                /*const values = [].filter.call(el.options, function(o) {
                    return o.selected;
                }).map(function(o) {
                    return o.value;
                });*/

            if (filterKey === 'evatorAll') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: false}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: false}));
            }
            else if (filterKey === 'elevatorCabineIsAvailable') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: true}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: false}));
            }
            else if (filterKey === 'elevatorIsWheelchairAccessible') {
                dispatch(setFilter('elevatorCabineIsAvailable', {active: false}));
                dispatch(setFilter('elevatorIsWheelchairAccessible', {active: true}));
            }

            if (filterKey === 'search') {
                active = el.value === '' ? false : true;
                dispatch(setFilter(filterKey, {active, value: el.value}));
            }


            /*if (filterKey === 'category') {
                dispatch(setFilter(filterKey, {active: true, value: el.value}));
            } else if (filterKey === 'search') {
                active = el.value === '' ? false : true;
                dispatch(setFilter(filterKey, {active, value: el.value}));
            } else {
                dispatch(setFilter(filterKey, {active}));
            }*/
        },
        onSubmit: (e, filter) => {
            e.preventDefault();
            dispatch(requestPlaces()).then(
                response => {
                    hashHistory.push('/results');
                }
            );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

