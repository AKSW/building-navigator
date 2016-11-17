/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

/*
 * Map component
 */

import React, {PropTypes} from 'react';
import {Map as OSMap, Marker, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';
import Markers from './Markers';

const Map = (props) => {
    console.log('Map-Props:', props);
    const {mapConfig, places, selectedPlace, requestPlaces,
        onLoadMap, onClickMarker, onZoomend, onClickShowDetails} = props;
    const position = [mapConfig.lat, mapConfig.lng];

    /*return (
        <div>
            I'm the map container...
            <Markers places={props.places}
                onClickMarker={props.onClickMarker}
                onClickShowDetails={props.onClickShowDetails}
            />
        </div>
    );*/

    return (
        <div id="mapContainer">
            <OSMap center={position} zoom={mapConfig.zoom} zoomControl={false}
                onZoomend={onZoomend}
            >
                <TileLayer
                    onLoad={e => onLoadMap(e, selectedPlace)}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright"/>
                <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                {places.length > 0 &&
                    <Markers places={places}
                        onClickMarker={onClickMarker}
                        onClickShowDetails={onClickShowDetails}
                    />
                }
            </OSMap>
            {requestPlaces &&
                <span>...loading places</span>
            }
            {!requestPlaces && places.length === 0 &&
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
