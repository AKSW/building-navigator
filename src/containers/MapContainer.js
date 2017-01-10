/**
  * Container of the map
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import {getDistance} from '../middleware/store';
import Map from '../components/Map';
import {
    updateMapConfig,
    updateMapZoom,
    setSelectedPlace,
    requestPlaces,
    updateSelectedPlaceId,
    showDetails,
    toggleSidebar,
    scrollToSelectedPlace
} from '../actions';

let mapNodeRef = null;
let sidebarIsVisible = false;

export const mapMaxZoom = () => {
    return 18;
};

const getPopupOfPlaceId = (placeId) => {
    const layerEls = mapNodeRef._layers;
    console.log('layerEls:', layerEls);

    mapNodeRef.eachLayer(function(layer) {
        console.log(layer);
        if (layer.options['data-id'] === placeId) {
            console.log('FOUND');
            layer.closePopup();
            return layer;
        }
    });

    return undefined;
};

const mayPopupSelectedPlace = (map, selectedPlace) => {
    const layerEls = map._layers;
    if (selectedPlace.hasOwnProperty('uri')) {
        Object.keys(layerEls).forEach((key) => {
            if (layerEls[key].hasOwnProperty('_popup') &&
                layerEls[key].options['data-name'] === selectedPlace.name.value)
            {
                /** @todo do not open, if place details are visible in sidebar */
                layerEls[key].openPopup();
            }
        });
    }
};

const groupUngroupPlaces = (places, zoom) => {
    const markers = [];

    places.forEach((place, idx) => {
        const markerLat = parseFloat(place.latitude);
        const markerLng = parseFloat(place.longitude);
        const marker = {
            type: 'marker',
            lat: markerLat,
            lng: markerLng,
            places: []
        };

        /*if (idx >= 0) {
            markers.push({
                type: 'marker',
                lat: markerLat,
                lng: markerLng,
                places: [place]
            });
        }*/
        const midx = markers.length - 1;

        places.forEach((placeB, idxB) => {
            if (place.titel === placeB.titel) {
                return;
            }
            const placeBLat = parseFloat(placeB.latitude);
            const placeBLng = parseFloat(placeB.longitude);
            // may add multi marker
            if (markerLat === placeBLat && markerLng === placeBLng) {
                marker.type = 'multi-marker';
                marker.places.push(placeB);
                places.splice(idxB, 1);
            }
            const distAB = getDistance({
                lat1: markerLat,
                lng1: markerLng,
                lat2: parseFloat(placeB.latitude),
                lng2: parseFloat(placeB.longitude)
            });
            /*console.log('Distance ', place.titel, ' to ', placeB.titel, ': ', distAB);
            if (distAB <= (18 % zoom) * 2) {
                console.log('ADD TO GROUP!');
            }*/
        });

        marker.places.push(place);
        markers.push(marker);
    });
    //console.log('Map zoom: ', zoom);
    //console.log('Dist-mod: ', (18 % zoom));
    return markers;
};

//let timeout = undefined;

const mapStateToProps = (state, ownProps) => {
    sidebarIsVisible = state.main.sidebarIsVisible;
    /** @todo dont group marker in closest zoom -> use multi-pop *7
    /** @todo use multi-popup for places on same lat-lng */
    /** @todo may group/split markers (after timeout x) */
    /** @todo we don't need to recalculate distances after zoom (it doenst change1), just if places are grouped */
    /** @todo may zoom in/out map after search to markers bounds (e.g. if results are outside of map bounds) */
    /*clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log('TODO: may group markers', state.places.places, state.map.zoom);
    }, 1000);*/

    // we clone with slice, otherwise it sorts also the states places!
    const places = state.places.places.slice(0);
    const markers = groupUngroupPlaces(places, state.map.zoom);
    console.log('markers: ', markers);
    //console.log('ownProps: ', ownProps);

    return {
        prevHistoryRoute: state.main.prevHistoryRoute,
        requestPlaces: state.places.doRequest,
        markers,
        selectedPlaceId: state.places.selectedPlaceId,
        mapConfig: state.map,
        sidebarIsVisible: state.main.sidebarIsVisible,
        doPlacesRequestAfterDrag: state.main.searchSubmitted && ownProps.location.pathname === '/results',
        hideMapControls: state.main.isSmallView && state.main.sidebarIsVisible,
    };
};

const mapDispatchToProps = (dispatch) => {
    let map = null;
    return {
        onLoadMap: (e) => {
            map = e.target._map;
            mapNodeRef = map;
            // we also need to update map config here
            /*dispatch(updateMapConfig({
                zoom: map.getZoom(),
                center: map.getCenter(),
                bounds: map.getBounds()
            }));*/
            /** @todo do not reopen popup after closed, but zoom/drag starts onLoadMap */
            //mayPopupSelectedPlace(map, selectedPlace);
        },
        onClickMarker: (e, place) => {
            //dispatch(setSelectedPlace(place));
            dispatch(updateSelectedPlaceId(place.id));
        },
        onClickGroupMarker: (e, group) => {
            map = e.target._map;
            dispatch(updateMapConfig({
                center: {lat: group.lat, lng: group.lng},
            }));
            map.zoomIn();
            //dispatch(updateMapZoom({zoom: mapMaxZoom()}));
        },
        onClickShowDetails: (e, place) => {
            if (!sidebarIsVisible) {
                dispatch(toggleSidebar());
            }
            dispatch(updateSelectedPlaceId(place.id));
            dispatch(showDetails(place.id));
            /*getPopupOfPlaceId(place.id.value);
            hashHistory.push(`/place/${place.id.value}`);*/
            //resultEntry.scrollIntoView({behavior: 'smooth'});
            dispatch(scrollToSelectedPlace());
            e.preventDefault();
        },
        onZoomend: (node) => {
            map = node.leafletElement;
            // map is null after programmatically-zoom-in (e.g. goto place x)
            if (map !== null) {
                dispatch(updateMapConfig({
                    zoom: map.getZoom(),
                    center: map.getCenter(),
                    bounds: map.getBounds()
                }));
            }
        },
        onDragend: (node, doPlacesRequest) => {
            map = node.leafletElement;
            dispatch(updateMapConfig({
                center: map.getCenter(),
                bounds: map.getBounds()
            }));
            if (doPlacesRequest) {
                /** @todo request new places und merge with already listed places */
                dispatch(requestPlaces());
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
