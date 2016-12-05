/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

/*
 * Map component
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button, Glyphicon} from 'react-bootstrap';
import {Map as OSMap, Marker, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';

import Markers from './Markers';

const Map = ({
    prevHistoryRoute,
    mapConfig,
    markers,
    selectedPlace,
    selectedPlaceId,
    requestPlaces,
    onLoadMap,
    onClickMarker,
    onClickGroupMarker,
    onZoomend,
    onDragend,
    onClickShowDetails
}) => {
    const center = [mapConfig.center.lat, mapConfig.center.lng];
    let mapRef = null;

    return (
        <div id="mapContainer" tabIndex="-1">
            <OSMap
                id="OSMap"
                center={center}
                zoom={mapConfig.zoom}
                zoomControl={false}
                onZoomend={e => onZoomend(mapRef)}
                onDragend={e => onDragend(mapRef)}
                ref={node => (mapRef = node)}
            >
                <TileLayer
                    onLoad={e => onLoadMap(e, selectedPlace)}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright"/>
                <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                {markers.length > 0 &&
                    <Markers
                        markers={markers}
                        selectedPlaceId={selectedPlaceId}
                        onClickMarker={onClickMarker}
                        onClickGroupMarker={onClickGroupMarker}
                        onClickShowDetails={onClickShowDetails}
                    />
                }
            </OSMap>
            {requestPlaces &&
                <span>...loading places</span>
            }
            {!requestPlaces && markers.length === 0 &&
                <span>No places found!</span>
            }
        </div>
    );
};

Map.propTypes = {
    mapConfig: PropTypes.object,
    requestPlaces: PropTypes.bool,
    places: PropTypes.array,
    onZoomend: PropTypes.func
};

export default Map;
