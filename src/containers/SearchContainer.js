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
        //places: state.places.places
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (filterKey, active, node) => {
            const el = ReactDOM.findDOMNode(node);

            if (filterKey === 'category') {
                const values = [].filter.call(el.options, function(o) {
                    return o.selected;
                }).map(function(o) {
                    return o.value;
                });
                if (values.indexOf('all') === 0) {
                    dispatch(setFilter(filterKey, {active: false, value: []}));
                } else {
                    dispatch(setFilter(filterKey, {active: true, value: values}));
                }
            } else if (filterKey === 'search') {
                const value = ReactDOM.findDOMNode(node).value;
                active = value === '' ? false : true;
                dispatch(setFilter(filterKey, {active, value}));
            } else {
                dispatch(setFilter(filterKey, {active}));
            }
            //dispatch(requestPlaces());
        },
        onSubmit: (e, filter) => {
            dispatch(requestPlaces());
            e.preventDefault();
            hashHistory.push('/results');
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

