/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Map, Marker, Popup, TileLayer, ZoomControl, ScaleControl} from 'react-leaflet';
import {connect} from 'react-redux';

const MapMarkers = ({markers, onClickMarker}) => {
    console.log('Markers:', markers);

    const markersHtml = markers.map(({id, name, uri, popupText, lat, lng}) => (
        <Marker key={id} position={[lat, lng]} onClick={() => onClickMarker(markers, id)}>
            <Popup>
                <span>{name}<br />{popupText}</span>
            </Popup>
        </Marker>
        /*<p key={id} onClick={() => onClickMarker(markers, id)}>
            {id} - {uri}
        </p>*/
    ));

    return (
        <div>
            {markersHtml}
        </div>
    );
};

MapMarkers.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        popoverText: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onClickMarker: PropTypes.func.isRequired,
};

//export default MapMarkers;
export default connect()(MapMarkers);
