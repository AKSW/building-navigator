/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Panel,
    PanelGroup,
    Glyphicon,
    Table,
    Button,
    Image
} from 'react-bootstrap';

const entryStyle = {
    borderBottom: '1px solid lightGray',
    list: {
        listStyleType: 'none',
        paddingLeft: '8px',
        entry: {
            display: 'inline-block',
            padding: '0px 6px',
        },
    },
    address: {
        paddingLeft: '14px',
        marginBottom: '10px',
    },
    accIcon: {
        width: '32px',
        height: '32px',
    },
    accIconNA: {
        opacity: '0.5'
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


    const elevatorIcon = () => {
        if (place.elevatorCabineIsAvailable.value === 'ja') {
            if (place.elevatorIsWheelchairAccessible.value === 'ja') {
                return (
                    <Image
                        src="/images/elevator-wheelchair.svg"
                        className="accessible-icon accessible"
                        style={entryStyle.accIcon}
                        title="Aufzug ist vorhanden und rollstuhlgerecht"
                        aria-label="Aufzug ist vorhanden und rollstuhlgerecht"
                    />
                );
            }
            return (
                <Image
                    src="/images/elevator.svg"
                    className="accessible-icon"
                    style={entryStyle.accIcon}
                    title="Aufzug ist vorhanden"
                    aria-label="Aufzug ist vorhanden"
                />
            );
        }
        return (
            <Image
                src="/images/elevator.svg"
                className="accessible-icon not-available"
                style={Object.assign({}, entryStyle.accIcon, entryStyle.accIconNA)}
                title="Aufzug ist nicht vorhanden"
                aria-label="Aufzug ist nicht vorhanden"
            />
        );
    };

    const toiletIcon = () => {
        if (place.toiletIsAvailable.value === 'ja') {
            if (place.toiletIsWheelchairAccessible.value === 'ja') {
                return (
                    <Image
                        src="/images/toilet-wheelchair.svg"
                        className="accessible-icon accessible"
                        style={entryStyle.accIcon}
                        title="Toilette ist vorhanden und rollstuhlgerecht"
                        aria-label="Toilette ist vorhanden und rollstuhlgerecht"
                    />
                );
            }
            return (
                <Image
                    src="/images/toilet.svg"
                    className="accessible-icon"
                    style={entryStyle.accIcon}
                    title="Toilette ist vorhanden"
                    aria-label="Toilette ist vorhanden"
                />
            );
        }
        return (
            <Image
                src="/images/toilet.svg"
                className="accessible-icon not-available"
                style={Object.assign({}, entryStyle.accIcon, entryStyle.accIconNA)}
                title="Toilette ist nicht vorhanden"
                aria-label="Toilette ist nicht vorhanden"
            />
        );
    };

    return (
        <div className="result-entry" id={`result-entry-${place.id.value}`} style={entryStyle}>
            {!place._UI.showDetails &&
                <div>
                    <h3 tabIndex={tabIdx}>
                        <Link
                            to={`/place/${place.id.value}`}
                            onClick={e => onClickResult(e, place)}
                        >
                            {/** @todo load place-details, set as selected and go to route... */}
                            {place.title.value}
                        </Link>
                    </h3>
                    <ul style={entryStyle.list}>
                        <li style={entryStyle.list.entry}>
                            {elevatorIcon()}
                        </li>
                        <li style={entryStyle.list.entry}>
                            {toiletIcon()}
                        </li>
                    </ul>
                    <address style={entryStyle.address}>
                        {place.address.value}
                        <span aria-hidden={true}>
                            &nbsp;(<Link
                                to={`/place/${place.id.value}`}
                                onClick={e => onClickShowOnMap(e, place)}
                                aria-label="Ort auf Karte zeigen"
                                title="Ort auf Karte zeigen"
                            >
                                <i className="fa fa-map-marker"></i> zeige auf Karte
                            </Link>)
                        </span>
                    </address>
                </div>
            }

            {place._UI.showDetails &&
                <div>
                    <h3 tabIndex={idx}>
                        <Link
                            to={`/place/${place.id.value}`}
                            onClick={e => onClickResult(e, place)}
                        >
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
                        <strong>Adresse:</strong> {place.address.value}
                    </address>
                    <p>
                        <strong>Kategorie:</strong> {place.category.value}
                    </p>
                    {place.hasOwnProperty('note') &&
                        <p>
                            <strong>Bemerkung</strong><br />
                            {place.note.value.split("\n").map(p => {
                                return <span>{p}<br /></span>;
                            })}
                        </p>
                    }
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
                        <span>Details <Glyphicon glyph="chevron-down" /></span>
                    }
                    {place._UI.showDetails &&
                        <span>Details <Glyphicon glyph="chevron-up" /></span>
                    }
                </Button>
                {/*<Link
                    to={`/place/${place.id.value}`}
                    onClick={e => onClickShowOnMap(e, place)}
                    className="btn btn-link"
                    aria-label="Ort auf Karte zeigen"
                    title="Ort auf Karte zeigen"
                >
                    <i className="fa fa-map-marker" aria-hidden="true"></i> Karte
                </Link>*/}
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
