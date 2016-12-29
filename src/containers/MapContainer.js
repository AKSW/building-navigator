/**
  * Container of the map
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
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
    showDetails
} from '../actions';
import {scrollTo} from './SmoothScroll';

let mapNodeRef = null;

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

const groupUngroupPlacesOld = (places, zoom) => {
    const markers = [];
    places.sort((a, b) => {
        return parseFloat(a.lng.value) - parseFloat(b.lng.value);
    });
    /** @todo BUGFIX need loop in loop! */
    places.forEach((place, idx) => {
        if (idx === 0) {
            markers.push({
                lat: parseFloat(place.lat.value),
                lng: parseFloat(place.lng.value),
                places: [place]
            });
            return;
        }

        /*const isNewMarker = true;
        markers.forEach((marker, midx) => {
            // if (getDistance(place, marker) < -1) {
            //     // add to group
            //     isNewMarker = false;
            //     return;
            // }
            const d = getDistance({
                lat1: parseFloat(place.lat.value),
                lng1: parseFloat(place.lng.value),
                lat2: marker.lat,
                lng2: marker.lng
            });
            console.log('Distance:', place, marker, d);
        });

        if (!isNewMarker) {
            return;
        }*/

        const midx = markers.length - 1;
        /** @todo introduce multi-popup-marker */
        if (zoom < mapMaxZoom() &&
            (parseFloat(place.lng.value) - markers[midx].lng) * zoom <= 0.044 &&
            Math.abs(parseFloat(place.lat.value) - markers[midx].lat) * zoom <= 0.018
        ) {
            //console.log('Create Group', place, markers[midx].places);
            markers[midx].places.push(place);
        } else {
            markers.push({
                lat: parseFloat(place.lat.value),
                lng: parseFloat(place.lng.value),
                places: [place]
            });
        }
    });
    return markers;
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
                console.log('MULTI-MARKER: ', place.titel, ' & ', placeB.titel);
                marker.type = 'multi-marker';
                marker.places.push(placeB);
                places.splice(idxB, 1);
            }
            /*const distAB = getDistance({
                lat1: markerLat,
                lng1: markerLng,
                lat2: parseFloat(placeB.latitude),
                lng2: parseFloat(placeB.longitude)
            });
            console.log('Distance ', place.titel, ' to ', placeB.titel, ': ', distAB);
            if (distAB <= (18 % zoom)) {
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

const isSmallMapView = (state) => {
    const appEl = document.getElementById(state.main.rootDomId);
    if (state.main.sidebarIsVisible && appEl.offsetWidth <= 420) {
        return false;
    }
    return true;
};

//let timeout = undefined;

const mapStateToProps = (state, ownProps) => {
    /** @todo dont group marker in closest zoom -> use multi-pop *7
    /** @todo use multi-popup for places on same lat-lng */
    /** @todo may group/split markers (after timeout x) */
    /** @todo we don't need to recalculate distances after zoom (it doenst change1), just if places are grouped */
    /** @todo may zoom in/out map after search to markers bounds (e.g. if results are outside of map bounds) */
    /*clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log('TODO: may group markers', state.places.places, state.map.zoom);
    }, 1000);*/

    // we need to clone, else it sorts also the states places!
    const markers = groupUngroupPlaces(state.places.places.slice(0), state.map.zoom);
    console.log('markers: ', markers);
    //console.log('ownProps: ', ownProps);

    return {
        prevHistoryRoute: state.main.prevHistoryRoute,
        requestPlaces: state.places.doRequest,
        markers,
        selectedPlace: state.places.selectedPlace,
        selectedPlaceId: state.places.selectedPlaceId,
        mapConfig: state.map,
        sidebarIsVisible: state.main.sidebarIsVisible,
        doPlacesRequestAfterDrag: state.main.searchSubmitted && ownProps.location.pathname === '/results' ?
            true :
            false,
        showMapControls: isSmallMapView(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    let map = null;
    return {
        onLoadMap: (e, selectedPlace) => {
            map = e.target._map;
            mapNodeRef = map;
            // we also need to update map config here
            dispatch(updateMapConfig({
                zoom: map.getZoom(),
                center: map.getCenter(),
                bounds: map.getBounds()
            }));
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
            //dispatch(setSelectedPlace(place));
            dispatch(updateSelectedPlaceId(place.id));
            dispatch(showDetails(place.id));
            /*getPopupOfPlaceId(place.id.value);
            hashHistory.push(`/place/${place.id.value}`);*/

            const resultEntry = document.getElementById(`result-entry-${place.id}`);
            //resultEntry.scrollIntoView({behavior: 'smooth'});
            console.log('TODO: scroll to place');
            console.log(resultEntry.offsetTop);
            scrollTo(
                document.getElementById('sidebar'),
                resultEntry.offsetTop,
                300
            );
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
