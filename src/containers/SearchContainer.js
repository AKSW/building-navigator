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
    updateFilter,
    updateMainState,
    requestPlaces,
    updateMapCenter,
    updateMapZoom
} from '../actions';
import {getActiveFilterOption} from '../reducers/filter';

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
        getActiveFilterOption
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (filterGroup, filterId) => {
            const el = ReactDOM.findDOMNode(filterGroup.node);

            let active = true;
            let value = null;
            let optionId = null;

            //console.log('onChange', filterId, el.label, el.value, el.checked,
            //el.selected, el.active, el.id, el.type);
            //console.log('filterGroup: ', filterGroup);
            // Aha: in setFilter(), wenn typeof filter[key].value === array, alle false außer gruppe mit index el.id


            switch (el.type) {
            case 'search':
                value = el.value.trim();
                active = value === '' ? false : true;
                break;
            case 'select-one':
                optionId = el.value;
                break;
            case 'radio':
                optionId = el.value;
                break;
            case 'checkbox':
                active = el.checked;
                break;
            default:
            }

            //const value = getSelectedOptions(el)[0];

            //console.log('UPDATE FILTER: ', filterId, optionId, active, value);

            dispatch(updateFilter({filterId, optionId, active, value}));

            // may zoom to district
            if (filterId === 'district') {
                const activeDistrict = getActiveFilterOption(filterGroup);
                dispatch(updateMapCenter({lat: activeDistrict.lat, lng: activeDistrict.lng}));
                dispatch(updateMapZoom({zoom: 15}));
            }

            /*
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
            else if (key === 'elevatorAll') {
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
            }*/
        },
        onSubmit: (e, filter) => {
            e.preventDefault();
            window.setTimeout(() => {
                const el = document.getElementById('search-request-loader');
                if (el !== null) {
                    el.focus();
                }
            }, 100);
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

