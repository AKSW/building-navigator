/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Marker as OSMarker, Popup} from 'react-leaflet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Markers = (props) => {
    //console.log('Markers-Props:', props);
    const {places, onClickMarker, onClickShowDetails} = props;

    const markersHtml = places.map((place, id) => {
        const pos = [parseFloat(place.lat.value), parseFloat(place.lng.value)];
        return (
            <OSMarker key={id}
                position={pos}
                onClick={(e) => onClickMarker(e, places[id])}
                data-name={place.name.value}
            >
                    <Popup>
                        <span>
                            {place.name.value}<br />
                            {place.uri.value}<br />
                            <a href={`#place/${place.name.value}`}
                                onClick={() => onClickShowDetails(props.places[id])}>
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
