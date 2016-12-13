/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Marker as OSMarker, Icon, Popup} from 'react-leaflet';
import {Link} from 'react-router';
import L from 'leaflet';

/** @todo add number of grouped places to icon -> with divIcon?! */
const groupIcon = L.icon({
    iconUrl: './images/group-marker-icon.png',
    iconSize: [53, 42],
    iconAnchor: [26, 42]
});

const selectedIcon = L.icon({
    iconUrl: './images/selected-marker-icon.png',
    iconSize: [31, 51],
    iconAnchor: [15, 51],
    popupAnchor:  [0, -45]
});

const markerIcon = L.icon({
    iconUrl: './images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor:  [0, -45]
});

const Markers = ({
    markers,
    selectedPlaceId,
    onClickMarker,
    onClickGroupMarker,
    onClickShowDetails
}) => {
    const groupMarkerHtml = (id, groupData) => {
        const pos = [groupData.lat, groupData.lng];
        return (
            <OSMarker
                key={id}
                position={pos}
                onClick={(e) => onClickGroupMarker(e, groupData)}
                data-name="Gruppen-Marker XYZ"
                icon={groupIcon}
             />
        );
    };

    const markerHtml = (id, place) => {
        const pos = [parseFloat(place.lat.value), parseFloat(place.lng.value)];
        const popup = (
            <Popup>
                <span>
                    <div id={`place-popup-${place.id.value}`}>
                        <p>
                            <strong>{place.title.value}</strong>
                        </p>
                        <p>
                            <a href={`#/place/${place.id.value}`}
                                onClick={e => onClickShowDetails(e, place)}>
                                    Details
                            </a>
                        </p>
                    </div>
                </span>
            </Popup>
        );
        if (selectedPlaceId === place.id.value) {
            return (
                <OSMarker
                    key={id}
                    position={pos}
                    onClick={(e) => onClickMarker(e, place)}
                    data-name={place.title.value}
                    data-id={place.id.value}
                    icon={selectedIcon}
                >
                    {popup}
                </OSMarker>
            );
        }

        return (
            <OSMarker
                key={id}
                position={pos}
                onClick={(e) => onClickMarker(e, place)}
                data-name={place.title.value}
                data-id={place.id.value}
                icon={markerIcon}
            >
                {popup}
            </OSMarker>
        );
    };

    const markersHtml = markers.map((marker, id) => {
        return marker.places.length > 1 ?
            groupMarkerHtml(id, marker) :
            markerHtml(markers.length + id, marker.places[0])
        ;
    });

    return (
        <div>
            {markersHtml}
        </div>
    );
};

Markers.propTypes = {
    markers: PropTypes.array,
    /*arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        popoverText: PropTypes.string.isRequired
    }).isRequired).isRequired,*/
    onClickMarker: PropTypes.func.isRequired,
    onClickShowDetails: PropTypes.func
};

export default Markers;
