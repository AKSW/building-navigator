/**
  * Container of the map
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import Map from '../components/Map';
import {requestPlaces, setSelectedPlace} from '../actions';

const mayPopupSelectedPlace = (map, selectedPlace) => {
    const layerEls = map._layers;
    if (selectedPlace.hasOwnProperty('uri')) {
        Object.keys(layerEls).forEach((key) => {
            if (layerEls[key].hasOwnProperty('_popup') &&
                layerEls[key].options['data-name'] === selectedPlace.name.value)
            {
                layerEls[key].openPopup();
            }
        });
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        requestPlaces: state.places.doRequest,
        places: state.places.places,
        selectedPlace: state.places.selectedPlace,
        mapConfig: state.map,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMap: (e, selectedPlace) => {
            const map = e.target._map;
            mayPopupSelectedPlace(map, selectedPlace);
        },
        onClickMarker: (e, place) => {
            dispatch(setSelectedPlace(place));
        },
        onClickShowDetails: (place) => {
            dispatch(setSelectedPlace(place));
            hashHistory.push(`/place/${place.name.value}`);
        },
        onZoomend: (e) => {
            //console.log('TODO: get and set data (e.g. boundingBox) from Map/Leaflet, e:', e);
            //dispatch(setMapZoom({zoom: e.target._zoom}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
