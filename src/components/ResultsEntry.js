/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Panel, PanelGroup, Glyphicon, Table} from 'react-bootstrap';

const ResultsEntry = ({
    place,
    filter,
    tabIdx,
    idx,
    activeFilter,
    placesAccessAttr,
    placesLength,
    onClickResult,
    toggleDetails,
    doDetailsRequest
}) => {
    let toggleDetailsNode = null;
    let ariaLabel = `${idx} von ${placesLength}. ${place.name.value}`;
    if (placesAccessAttr > activeFilter) {
        if (activeFilter > 0) {
            ariaLabel += (placesAccessAttr - activeFilter) === 1 ?
                `, ${placesAccessAttr - activeFilter} weiteres Kriterium barrierefrei` :
                `, ${placesAccessAttr - activeFilter} weitere Kriterien barrierefrei`;
        } else {
            ariaLabel += (placesAccessAttr - activeFilter) === 1 ?
                `, ${placesAccessAttr} Kriterium barrierefrei` :
                `, ${placesAccessAttr} Kriterien barrierefrei`;
        }
    }

    return (
        <div>
            <h3 tabIndex={tabIdx}>
                <a href="#" aria-label={ariaLabel}>
                    {ariaLabel}
                </a>
            </h3>
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
            <div>
                <address>
                    Adresse: {place.address.value}
                </address>
            </div>
            <p>
                <small>
                    <button
                        aria-label="Ergebnisdetails"
                        aria-expanded={place._UI.showDetails}
                        onClick={e => toggleDetails(e, toggleDetailsNode)}
                        ref={node => {
                            toggleDetailsNode = {node, place};
                        }}
                    >
                        Details <Glyphicon glyph="chevron-down" />
                    </button>
                </small>
            </p>
            {place._UI.showDetails && !doDetailsRequest &&
                <div>
                    <p>
                        Kategorie: {place.category.value}
                    </p>
                    <p>
                        {place.note.value}
                    </p>
                </div>
            }
            <p>
                <small>
                    <a href="#map/{place.name.value}"
                        onClick={e => onClickResult(place)}
                    >
                        Ort auf Karte zeigen
                    </a>
                </small>
            </p>
        </div>
    );
};

/*ResultsEntry.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default ResultsEntry;
