/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Panel, PanelGroup, Glyphicon, Table, Button} from 'react-bootstrap';

const entryStyle = {
    borderBottom: '1px solid lightGray',
    h3: {
        fontSize: '1.5em',
    }
};

const ResultsEntry = ({
    place,
    filter,
    tabIdx,
    idx,
    activeFilter,
    placesAccessAttr,
    placesLength,
    onClickResult,
    onClickShowOnMap,
    toggleDetails,
    doDetailsRequest
}) => {
    const ariaLabel = `${idx} von ${placesLength}. ${place.title.value}`;
    /*if (placesAccessAttr > activeFilter) {
        if (activeFilter > 0) {
            ariaLabel += (placesAccessAttr - activeFilter) === 1 ?
                `, ${placesAccessAttr - activeFilter} weiteres Kriterium barrierefrei` :
                `, ${placesAccessAttr - activeFilter} weitere Kriterien barrierefrei`;
        } else {
            ariaLabel += (placesAccessAttr - activeFilter) === 1 ?
                `, ${placesAccessAttr} Kriterium barrierefrei` :
                `, ${placesAccessAttr} Kriterien barrierefrei`;
        }
    }*/

    return (
        <div className="result-entry" style={entryStyle}>
            {!place._UI.showDetails &&
                <div>
                    <h3 tabIndex={tabIdx} style={entryStyle.h3}>
                        <Link to={`/place/${place.id.value}`}>
                            {/** @todo load place-details, set as selected and go to route... */}
                            {place.title.value}
                        </Link>
                    </h3>
                    <ul>
                        <li>
                            {place.elevatorCabineIsAvailable.value === 'ja' &&
                                <span>Lift ist vorhanden</span>
                            }
                            {place.elevatorCabineIsAvailable.value !== 'ja' &&
                                <span>Lift ist nicht vorhanden</span>
                            }
                        </li>
                        <li>
                            {place.elevatorIsWheelchairAccessible.value === 'ja' &&
                                <span>
                                    Lift ist rollstuhlgerecht
                                </span>
                            }
                            {place.elevatorIsWheelchairAccessible.value !== 'ja' &&
                                <span>Lift ist nicht rollstuhlgerecht</span>
                            }
                        </li>
                    </ul>
                </div>
            }

            {place._UI.showDetails &&
                <div>
                    <h3 tabIndex={idx} style={entryStyle.h3}>
                        <Link to={`/place/${place.id.value}`}>
                            {place.title.value}
                        </Link>
                    </h3>
                    <ul>
                        <li>
                            {place.elevatorCabineIsAvailable.value === 'ja' ?
                                'Lift ist vorhanden' :
                                'Lift ist nicht vorhanden'
                            }
                        </li>
                        <li>
                            {place.elevatorIsWheelchairAccessible.value === 'ja' &&
                                <span>
                                    Lift ist rollstuhlgerecht
                                    <br /><span>- Türbreite: {place.elevatorDoorWidth.value} cm</span>
                                    <br /><span>
                                        - Kabine: {place.elevatorCabineWidth.value} cm breit,
                                        {place.elevatorCabineLength.value} cm tief
                                    </span>
                                </span>
                            }
                            {place.elevatorIsWheelchairAccessible.value !== 'ja' &&
                                <span>Lift ist nicht rollstuhlgerecht</span>
                            }
                        </li>
                    </ul>
                    <address>
                        Adresse: {place.address.value}
                    </address>
                </div>
            }

            <div>
                <Button
                    bsStyle="link"
                    aria-label="Ergebnisdetails"
                    aria-expanded={place._UI.showDetails}
                    onClick={e => toggleDetails(place)}
                >
                    {!place._UI.showDetails &&
                        <span>Mehr Details <Glyphicon glyph="chevron-down" /></span>
                    }
                    {place._UI.showDetails &&
                        <span>Weniger Details <Glyphicon glyph="chevron-up" /></span>
                    }
                </Button>
                <Link
                    to={`/place/${place.id.value}`}
                    onClick={e => onClickShowOnMap(e, place)}
                    className="btn btn-link"
                >
                    Ort auf Karte zeigen
                </Link>
            </div>
        </div>
    );
};

/*ResultsEntry.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default ResultsEntry;
