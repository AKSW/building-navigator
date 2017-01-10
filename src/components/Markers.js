/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

import React, {PropTypes} from 'react';
import {Marker as OSMarker, Icon, Popup} from 'react-leaflet';
import {Link} from 'react-router';
import L from 'leaflet';
//import {DivIcon} from 'leaflet';

import A11yIcons from './A11yIcons';

const groupIcon = L.icon({
    iconUrl: './images/group-marker-icon-new.png',
    iconSize: [45, 45],
    iconAnchor: [22, 22],
    popupAnchor:  [0, -20],
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

const popupStyle = {
    fontSize: '16px'
};

const Markers = ({
    markers,
    testAllPlaces,
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
                data-name={`group-marker-${id}`}
                data-id={id}
                icon={groupIcon}
             />
        );
    };

    const multiMarkerHtml = (id, groupData) => {
        const pos = [groupData.lat, groupData.lng];
        let isSelected = false;
        let selectedPlace = null;
        const popup = (
            <Popup>
                <span>
                    {groupData.places.map(place => {
                        if (selectedPlaceId === place.id) {
                            isSelected = true;
                            selectedPlace = place;
                        }
                        return (
                            <div key={place.id} id={`place-popup-${place.id}`} style={popupStyle}>
                                <h3>{place.titel}</h3>
                                <A11yIcons
                                    place={place}
                                    showDetails={false}
                                />
                                <strong>Adresse</strong>:&nbsp;
                                <address>
                                    {place.strasse}, {place.plz} {place.ort}
                                </address>
                                <p>
                                    <a href={`#/place/${place.id}`}
                                        onClick={e => onClickShowDetails(e, place)}>
                                            Details
                                    </a>
                                </p>
                                <hr />
                            </div>
                        );
                    })}
                </span>
            </Popup>
        );
        if (isSelected) {
            return (
                <OSMarker
                    key={id}
                    position={pos}
                    data-name={`multi-marker-${id}`}
                    data-id={id}
                    icon={selectedIcon}
                    onClick={(e) => onClickMarker(e, selectedPlace)}
                >
                    {popup}
                </OSMarker>
            );
        }
        return (
            <OSMarker
                key={id}
                position={pos}
                data-name={`multi-marker-${id}`}
                data-id={id}
                icon={markerIcon}
                onClick={(e) => onClickMarker(e, groupData.places[0])}
            >
                {popup}
            </OSMarker>
        );
    };

    const singleMarkerHtml = (id, place) => {
        const pos = [parseFloat(place.latitude), parseFloat(place.longitude)];
        const popup = (
            <Popup>
                <span>
                    <div id={`place-popup-${place.id}`} style={popupStyle}>
                        <h3>{place.titel}</h3>
                        <A11yIcons
                            place={place}
                            showDetails={false}
                        />
                        <strong>Adresse</strong>:&nbsp;
                        <address>
                            {place.strasse}, {place.plz} {place.ort}
                        </address>
                        <p>
                            <a href={`#/place/${place.id}`}
                                onClick={e => onClickShowDetails(e, place)}>
                                    Details
                            </a>
                        </p>
                    </div>
                </span>
            </Popup>
        );
        if (selectedPlaceId === place.id) {
            return (
                <OSMarker
                    key={place.id}
                    position={pos}
                    onClick={(e) => onClickMarker(e, place)}
                    data-name={place.titel}
                    data-id={place.id}
                    icon={selectedIcon}
                    title={place.titel}
                >
                    {popup}
                </OSMarker>
            );
        }

        return (
            <OSMarker
                key={place.id}
                position={pos}
                onClick={(e) => onClickMarker(e, place)}
                data-name={place.titel}
                data-id={place.id}
                icon={markerIcon}
                title={place.titel}
            >
                {popup}
            </OSMarker>
        );
    };

    const markerHtml = markers.map((marker, id) => {
        if (marker.type === 'multi-marker') {
            return multiMarkerHtml(id, marker);
        }
        return singleMarkerHtml(markers.length + id, marker.places[0]);
    });

    return (
        <div>
            {markerHtml}
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
