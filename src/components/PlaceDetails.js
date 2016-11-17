/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Panel, PanelGroup, Glyphicon, Table} from 'react-bootstrap';
import {Link} from 'react-router';

const PlaceDetails = (params) => {
    //console.log('PlaceDetails-params: ', params);
    const {place, idx, onClickResult} = params;
    return (
        <div>
            <h3 tabIndex={idx}>
                <a href="#">
                    {place.name.value},&nbsp;
                </a>
            </h3>
            <div>
                {place.liftAvailable.value === 'yes' &&
                    <span>Lift ist vorhanden</span>
                }
                {place.liftWithWheelChairSupportAvailable.value === 'yes' &&
                    <span>Lift ist barrierefrei</span>
                }
                {place.toiletForDisabledPeopleAvailable.value === 'yes' &&
                    <span>Toilette ist barrierefrei</span>
                }
            </div>
            <address>
                {place.address.value}
            </address>
            <small>
                <a href="#map/${place.name.value}"
                    onClick={e => onClickResult(place)}
                    aria-label="Auf Karte anzeigen"
                >
                    Auf Karte anzeigen
                </a>
                <Link to={'/search'}>Zurück zur Suche</Link>
                <Link to={'/map'}>Alle Ergebnisse auf Karte anzeigen</Link>
            </small>
        </div>
    );
};

/*PlaceDetails.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default PlaceDetails;
