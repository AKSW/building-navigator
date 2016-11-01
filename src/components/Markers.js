/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Marker as OSMarker, Popup} from 'react-leaflet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Markers = (props) => {
    console.log('Markers-Props:', props);

    /*const markersHtml = props.places.map(({id, name, uri, popupText, lat, lng}) => (
        <Marker key={id} position={[lat, lng]} onClick={(e) => props.onClickMarker(e, props.markers[id])}>
            <Popup>
                <span>{name}<br />{popupText}</span>
            </Popup>
        </Marker>
        <p key={id} onClick={() => props.onClickMarker(props.markers[id])}>
            <Link to={`place/${name}`}>{id} - {uri}</Link>
        </p>
    ));*/

    const markersHtml = props.places.map((place, id) => {
        const pos = [parseFloat(place.lat.value), parseFloat(place.lng.value)];
        return (
            /*<p key={id}
                onClick={() => props.onClickMarker(props.places[id])}
            >
                {id} - {place.uri.value}:
                <a href={`#place/${place.name.value}`}
                    onClick={() => props.onClickShowDetails(props.places[id])}>
                        Details-Manuell
                </a>
                <Link to={`place/${place.name.value}`}>
                    Details-Link
                </Link>
            </p>
            */
            <OSMarker key={id}
                position={pos}
                onClick={(e) => props.onClickMarker(e, props.places[id])}>
                    <Popup>
                        <span>
                            {place.name.value}<br />
                            {place.uri.value}<br />
                            <a href={`#place/${place.name.value}`}
                                onClick={() => props.onClickShowDetails(props.places[id])}>
                                    Details
                            </a>
                        </span>
                    </Popup>
            </OSMarker>
        );
    });

    return (
        <div>
            {markersHtml}
        </div>
    );
};

Markers.propTypes = {
    places: PropTypes.array,
    /*arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        popoverText: PropTypes.string.isRequired
    }).isRequired).isRequired,*/
    onClickMarker: PropTypes.func.isRequired,
    onClickShowDetails: PropTypes.func
};

export default Markers;
