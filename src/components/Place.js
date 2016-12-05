/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Glyphicon} from 'react-bootstrap';

const entryStyle = {
    h3: {
        fontSize: '1.5em',
        color: '#333',
    }
};

const Place = ({
    doRequest,
    place,
    haveSearchResults,
    idx,
    onClickShowOnMap,
    setFocusTo
}) => {
    if (!doRequest && place.id !== undefined) {
        setFocusTo(`place-cap-${place.id.value}`);
    }
    return (
        <div>
            <Row>
                <Col xs={3}>
                    <Link
                        to={'/search'}
                        className="btn btn-link"
                    >
                        <Glyphicon glyph="search" aria-hidden="true" /> Zur Suche
                    </Link>
                </Col>
                {haveSearchResults &&
                    <Col xs={4}>
                        <Link
                            to={'/results'}
                            className="btn btn-link"
                        >
                            Zur Ergebnisliste
                        </Link>
                    </Col>
                }
                {doRequest &&
                    <Col md={12}>
                        <p tabIndex="-1">
                            <i className="fa fa-circle-o-notch fa-spin"></i> Lade Gebäudedaten
                        </p>
                    </Col>
                }
            </Row>

            {!doRequest && place.id !== undefined &&
                <div>
                    <h3 style={entryStyle.h3}>
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
                </div>
            }

        </div>
    );
};

/*Place.propTypes = {
    params: PropTypes.shape({
        place: PropTypes.string.isRequired,
    }).isRequired
};*/

export default Place;
