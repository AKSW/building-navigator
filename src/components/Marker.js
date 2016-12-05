/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React, {PropTypes} from 'react';
import {Marker as OSMarker, Popup} from 'react-leaflet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Markers = ({
    places,
    onClickMarker,
    onClickShowDetails
}) => {
    const groupMarker = () => {
        return null;
    };

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
                        <p>
                            <strong>{place.name.value}</strong>
                        </p>
                        <ul>
                            <li>
                                {place.liftAvailable.value === 'yes' &&
                                    <span>Lift ist vorhanden</span>
                                }
                                {place.liftAvailable.value !== 'yes' &&
                                    <span>Lift ist nicht vorhanden</span>
                                }
                            </li>
                            <li>
                                {place.liftWithWheelChairSupportAvailable.value === 'yes' &&
                                    <span>Lift ist barrierefrei</span>
                                }
                                {place.liftWithWheelChairSupportAvailable.value !== 'yes' &&
                                    <span>Lift ist nicht barrierefrei</span>
                                }
                            </li>
                            <li>
                                {place.toiletForDisabledPeopleAvailable.value === 'yes' &&
                                    <span>Toilette ist barrierefrei</span>
                                }
                                {place.toiletForDisabledPeopleAvailable.value !== 'yes' &&
                                    <span>Toilette ist nicht barrierefrei</span>
                                }
                            </li>
                        </ul>
                        <address>
                            {place.address.value}
                        </address>
                        <p>
                            <a href={`#place/${place.name.value}`}
                                onClick={() => onClickShowDetails(places[id])}>
                                    Details
                            </a>
                        </p>
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
