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
    const position = [props.mapConfig.lat, props.mapConfig.lng];

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
        <div>
            <OSMap center={position} zoom={props.mapConfig.zoom} zoomControl={false} onZoomend={props.onZoomend}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright"/>
                <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
                {props.places.length > 0 &&
                    <Markers places={props.places}
                        onClickMarker={props.onClickMarker}
                        onClickShowDetails={props.onClickShowDetails}
                    />
                }
            </OSMap>
            {props.requestPlaces &&
                <span>...loading places</span>
            }
            {!props.requestPlaces && props.places.length === 0 &&
                <span>No places found!</span>
            }
        </div>
    );
};

Map.propTypes = {
    mapConfig: PropTypes.object,
    requestPlaces: PropTypes.bool,
    places: PropTypes.array,
    onZoomend: PropTypes.func,
    updatePlaces: PropTypes.func
};

export default Map;
