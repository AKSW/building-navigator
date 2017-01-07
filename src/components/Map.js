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
    selectedPlaceId,
    requestPlaces,
    hideMapControls,
    onLoadMap,
    onClickMarker,
    onClickGroupMarker,
    onZoomend,
    onDragend,
    onClickShowDetails,
    sidebarIsVisible,
    doPlacesRequestAfterDrag
}) => {
    const center = [mapConfig.center.lat, mapConfig.center.lng];
    let mapRef = null;

    const osMapHtml = (
        <OSMap
            id="OSMap"
            center={center}
            zoom={mapConfig.zoom}
            zoomControl={false}
            onZoomend={e => onZoomend(mapRef)}
            onDragend={e => onDragend(mapRef, doPlacesRequestAfterDrag)}
            ref={node => (mapRef = node)}
        >
            <TileLayer
                onLoad={e => onLoadMap(e)}
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {!hideMapControls &&
                <ZoomControl position="topright"/>
            }
            {!hideMapControls &&
                <ScaleControl position="bottomright" maxWidth={300} imperial={false} />
            }
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
    );

    return (
        <div id="mapContainer" className={sidebarIsVisible === true ? '' : 'full'} tabIndex="-1">
            {osMapHtml}
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
