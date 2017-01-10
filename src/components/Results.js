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

const resultsStyle = {
    backToSearchWrapper: {
        paddingLeft: '0px',
        margin: '0px 0px 20px -5px',

    }
};

const Results = ({
    places,
    selectedPlaceId,
    filter,
    activeFilter,
    placesAccessAttr,
    onClickResult,
    onClickShowOnMap,
    toggleDetails,
    doDetailsRequest,
    doRequest,
    searchSubmitted,
    gotoSearch,
    scrollToSelectedPlace,
    doScrollTo,
    sidebarNode,
    getFocus
}) => {

    if (!searchSubmitted) {
        gotoSearch();
    }

    const resultsEntries = places.map((place, id) => {
        return (
            <ResultsEntry
                key={id}
                place={place}
                selectedPlaceId={selectedPlaceId}
                tabIdx={3 + id}
                idx={1 + id}
                filter={filter}
                activeFilter={activeFilter}
                placesAccessAttr={placesAccessAttr[id]}
                placesLength={places.length}
                toggleDetails={toggleDetails}
                onClickResult={(e, map) => onClickResult(e, map)}
                onClickShowOnMap={onClickShowOnMap}
                doDetailsRequest={doDetailsRequest}
                scrollToSelectedPlace={scrollToSelectedPlace}
                doScrollTo={(el) => doScrollTo(el, sidebarNode)}
            />
        );
    });

    return (
        <div>
            <Row>
                <Col md={12} style={resultsStyle.backToSearchWrapper}>
                    <Link
                        tabIndex="1"
                        to={'/search'}
                        className="btn btn-primary btn-lg"
                        title="Zurück zur Suche"
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
                        <p tabIndex="2" ref={node => getFocus(node)}>
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
            {places.length > 3 &&
                <Row>
                    <Col md={12} style={resultsStyle.backToSearchWrapper}>
                        <br />
                        <Link
                            to={'/search'}
                            className="btn btn-primary btn-lg"
                            title="Zurück zur Suche"
                        >
                            <Glyphicon glyph="search" aria-hidden="true" /> Zur Suche
                        </Link>
                    </Col>
                </Row>
            }
        </div>
    );
};

Results.propTypes = {
    places: PropTypes.array.isRequired
};

export default Results;
