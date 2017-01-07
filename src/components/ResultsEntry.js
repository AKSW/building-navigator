/**
  * Component for the place details sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Panel,
    PanelGroup,
    Glyphicon,
    Table,
    Button,
    Image
} from 'react-bootstrap';

import A11yIcons from './A11yIcons';
import styles from './results.css';

const ResultsEntry = ({
    place,
    selectedPlaceId,
    filter,
    tabIdx,
    idx,
    activeFilter,
    placesAccessAttr,
    placesLength,
    onClickResult,
    onClickShowOnMap,
    toggleDetails,
    doDetailsRequest,
    scrollToSelectedPlace,
    doScrollTo
}) => {
    /*const ariaLabel = `${idx} von ${placesLength}. ${place.titel}`;
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
    }*/

    const entryHtml = place._UI.showDetails ? (
        <div>
            <h3 tabIndex={idx}>
                <Link
                    to={`/place/${place.id}`}
                    onClick={e => onClickResult(e, place)}
                >
                    {place.titel}
                </Link>
            </h3>
            <A11yIcons
                place={place}
                showDetails={place._UI.showDetails}
            />
            <Row>
                <Col md={3}>
                    <strong>Adresse</strong>
                </Col>
                <Col md={9}>
                    <address>
                        {place.strasse}, {place.plz} {place.ort}
                    </address>
                    <span aria-hidden={true}>
                        <Link
                            to={`/place/${place.id}`}
                            onClick={e => onClickShowOnMap(e, place)}
                            aria-label="Ort auf Karte zeigen"
                            title="Ort auf Karte zeigen"
                        >
                            <i className="fa fa-map-marker"></i> zeige auf Karte
                        </Link>
                    </span>
                </Col>
            </Row><Row>
                <Col md={3}>
                    <strong>Kategorie</strong>
                </Col>
                <Col md={9}>
                    {place.kategorie}
                </Col>
            </Row>
            {place.oeffnungszeiten !== "" &&
                <Row>
                    <Col md={3}>
                        <strong>Öffnungszeiten</strong>
                    </Col>
                    <Col md={9}>
                        {place.oeffnungszeiten.split("\n").map((p, i) => {
                            return <span key={i}>{p}<br /></span>;
                        })}
                    </Col>
                </Row>
            }
            {place.beschreibung_hilfestellungen_vor_ort !== "" &&
                <Row>
                    <Col md={3}>
                        <strong>Hinweis</strong>
                    </Col>
                    <Col md={9}>
                        {place.beschreibung_hilfestellungen_vor_ort.split("\n").map((p, i) => {
                            return <span key={i}>{p}<br /></span>;
                        })}
                    </Col>
                </Row>
            }
        </div>
    ) : (
        <div>
            <h3 tabIndex={tabIdx}>
                <Link
                    to={`/place/${place.id}`}
                    onClick={e => onClickResult(e, place)}
                >
                    {place.titel}
                </Link>
            </h3>
            <A11yIcons
                place={place}
                showDetails={place._UI.showDetails}
            />
            <Row>
                <Col md={3}>
                    <strong>Adresse</strong>
                </Col>
                <Col md={9}>
                    <address>
                        {place.strasse}, {place.plz} {place.ort}
                    </address>
                    <span aria-hidden={true}>
                        <Link
                            to={`/place/${place.id}`}
                            onClick={e => onClickShowOnMap(e, place)}
                            aria-label="Ort auf Karte zeigen"
                            title="Ort auf Karte zeigen"
                        >
                            <i className="fa fa-map-marker"></i> zeige auf Karte
                        </Link>
                    </span>
                </Col>
            </Row>
        </div>
    );

    const className = selectedPlaceId !== place.id ?
        styles.entry :
        `${styles.entry} ${styles.selected}`;

    return (
        <div className={className} id={`result-entry-${place.id}`}
            ref={node => {
                /** @todo test (old) browser compatibility with saving node in state */
                place._UI.resultsListNode = node;
            }}
        >
            {scrollToSelectedPlace && selectedPlaceId === place.id &&
                <img
                    className="hidden"
                    src="./images/blank.gif"
                    onLoad={() => doScrollTo(place._UI.resultsListNode)}
                />
            }
            {entryHtml}
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
