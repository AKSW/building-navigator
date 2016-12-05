/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

import ResultsEntry from './ResultsEntry';
import MapContainer from '../containers/MapContainer';

const Results = ({
    places,
    filter,
    activeFilter,
    placesAccessAttr,
    onClickResult,
    onClickShowOnMap,
    toggleDetails,
    doDetailsRequest,
    doRequest
}) => {

    const resultsEntries = places.map((place, id) => {
        return (
            <div key={id}>
                <ResultsEntry
                    place={place}
                    tabIdx={2 + id}
                    idx={1 + id}
                    filter={filter}
                    activeFilter={activeFilter}
                    placesAccessAttr={placesAccessAttr[id]}
                    placesLength={places.length}
                    toggleDetails={toggleDetails}
                    onClickResult={onClickResult}
                    onClickShowOnMap={onClickShowOnMap}
                    doDetailsRequest={doDetailsRequest}
                />
            </div>
        );
    });

    return (
        <div>
            <Row>
                <Col md={12}>
                    <Link to={'/search'}
                        className="btn btn-link"
                    >
                        <Glyphicon glyph="search" aria-hidden="true" /> Zur Suche
                    </Link>
                </Col>
                <Col md={12}>
                    {doRequest &&
                        <p tabIndex="-1">
                            <i className="fa fa-circle-o-notch fa-spin"></i> Suche nach Gebäuden
                        </p>
                    }
                    {!doRequest &&
                        <p tabIndex="1" id="getFocus">
                            {places.length === 0 ? 'Kein Ergebnis' : ''}
                            {places.length === 1 ? `${places.length} Ergebnis` : ''}
                            {places.length > 1 ? `${places.length} Ergebnisse` : ''}
                            {filter.search.value !== '' ? ` für die Suche: ${filter.search.value}` : ''}
                            {activeFilter === 1 ? ', mit einem gesetzten Filter.' : ''}
                            {activeFilter > 1 ? `, mit ${activeFilter} gesetzten Filtern.` : ''}
                        </p>
                    }
                </Col>
            </Row>
            {resultsEntries}
            <p>
                <Link to={'/search'}>
                    <Glyphicon glyph="search" aria-hidden="true" /> Zur Suche
                </Link>
                {/*<Link to={'/map'}>Alle Ergebnisse auf Karte anzeigen</Link>*/}
            </p>
        </div>
    );
};

Results.propTypes = {
    places: PropTypes.array.isRequired
};

export default Results;
