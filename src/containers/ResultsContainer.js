/**
  * Container for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import Results from '../components/Results';
import {
    updateMapCenter,
    updateMapZoom,
    setSelectedPlace,
    toggleDetails,
    requestPlaceDetails,
    updateSelectedPlaceId,
    toggleSidebar
} from '../actions';
import {mapMaxZoom} from './MapContainer';
import {getElementById, scrollTo, focusOnNode} from './Utilities';

let isSmallView = false;
//let sidebarNode = null;
let rootNodeId = '';

const showOnMap = (dispatch, place) => {
    if (isSmallView) {
        dispatch(toggleSidebar());
    }
    dispatch(updateMapCenter({
        lat: parseFloat(place.latitude),
        lng: parseFloat(place.longitude)
    }));
    dispatch(updateMapZoom({zoom: mapMaxZoom()}));
    dispatch(updateSelectedPlaceId(place.id));
};

const mapStateToProps = (state, ownProps) => {
    isSmallView = state.main.isSmallView;
    rootNodeId = state.main.rootNodeId;
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
            key !== 'district' &&
            state.filter[key].active
        ) {
            activeFilter++;
        }
    }

    return {
        places: state.places.places,
        selectedPlaceId: state.places.selectedPlaceId,
        placesAccessAttr,
        filter: state.filter,
        activeFilter,
        doRequest: state.places.doRequest,
        doDetailsRequest: state.places.doDetailsRequest,
        searchSubmitted: state.main.searchSubmitted,
        scrollToSelectedPlace: state.places.scrollToSelectedPlace,
        sidebarNode: state.main.sidebarNode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickResult: (e, place) => {
            showOnMap(dispatch, place);
            e.preventDefault();
        },
        onClickShowOnMap: (e, place) => {
            showOnMap(dispatch, place);
            e.preventDefault();
        },
        toggleDetails: (place) => {
            dispatch(toggleDetails(place.id));
        },
        gotoSearch: () => {
            hashHistory.push('/search');
        },
        doScrollTo: (resultNode, sidebarNode) => {
            getElementById(rootNodeId, 'sidebar').then(sidebar => {
                const el = ReactDOM.findDOMNode(resultNode);
                scrollTo(sidebar, el.offsetTop, 300);
            });
            /*const rootNode = document.getElementById(rootNodeId);
            window.setTimeout(() => {
                const sidebar = rootNode.querySelector('#sidebar');
                const el = ReactDOM.findDOMNode(resultNode);
                scrollTo(sidebar, el.offsetTop, 300);
            }, 0);*/
        },
        getFocus: (node) => {
            focusOnNode(node);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);

