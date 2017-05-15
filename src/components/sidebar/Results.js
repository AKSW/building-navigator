import React from 'react';
import {Grid, Row, Col, Button, Pager} from 'react-bootstrap';

import ResultsEntry from './ResultsEntry';
import {getElement} from '../../utils/GuiUtils'

/**
 * Result component, renders results list with result entries
 */
class Results extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            buildings: this.getBuildingsSlice(props.stores)
        }

        this.handleBackToSearch = this.handleBackToSearch.bind(this);
        this.handleNextResults = this.handleNextResults.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
            buildings: this.getBuildingsSlice(nextProps.stores)
        });
    }

    componentDidMount() {
        getElement(this.state.stores.uiStore.get('userConfig').container, '.entry a').then((firstEl) => {
            firstEl.focus();
        })
    }

    /**
     * Get slice (resultsStart to resultsSteps) ob buildings
     *
     * @param {Object} Stores
     * @return {Array}
     */
    getBuildingsSlice(stores) {
        const buildings = stores.buildingStore.getVisibles();
        return buildings.slice(
            stores.uiStore.get('resultsStart'),
            stores.uiStore.get('resultsStart') + stores.uiStore.get('resultsSteps')
        );
    }

    /**
     * Click on back to search button
     */
    handleBackToSearch(e) {
        super.handleEvent({
            action: 'set-current-route',
            payload: {path: 'search'}
        });
        e.preventDefault();
    }

    /**
     * Goto previous results
     */
    handlePrevResults(e) {
        // may close any popup
        super.handleEvent({
            action: 'close-map-popup'
        });
        // reset selected building
        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {buildingId: null}
        });

        super.handleEvent({
            action: 'prev-results'
        });
        e.preventDefault();
    }

    /**
     * Goto next results
     */
    handleNextResults(e) {
        // may close any popup
        super.handleEvent({
            action: 'close-map-popup'
        });
        // reset selected building
        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {buildingId: null}
        });

        super.handleEvent({
            action: 'next-results'
        });
        // scroll top, focus on first result
        getElement(this.state.stores.uiStore.get('userConfig').container, '.sidebar').then((sidebar) => {
            sidebar.scrollTop = 0;
            getElement(this.state.stores.uiStore.get('userConfig').container, '.entry a').then((firstEl) => {
                firstEl.focus();
            })
        })
        e.preventDefault();
    }

    /**
     * Render results list, may paginated (pager)
     */
    render() {
        const initiated = this.state.stores.buildingStore.initiated;
        const visiblesLength = this.state.stores.buildingStore.getVisibles().length;
        const resultsStart = this.state.stores.uiStore.get('resultsStart');
        const resultsSteps = this.state.stores.uiStore.get('resultsSteps');

        // get pagination navigation
        const resultsPager = (
            <ul className="pager">
                {resultsStart > 0 &&
                    <li className="previous">
                        <a role="button" href="#" onClick={this.handlePrevResults} aria-label="Vorherige Ergebnisse">
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp; vorherige
                        </a>
                    </li>
                }
                <li><span>{(resultsStart+resultsSteps)/resultsSteps} von {Math.ceil(visiblesLength/resultsSteps)}</span></li>
                {(resultsStart + resultsSteps) < visiblesLength &&
                    <li className="next">
                        <a role="button" href="#" onClick={this.handleNextResults} aria-label="Nächste Ergebnisse">
                            nächste <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </a>
                    </li>
                }
            </ul>
        );

        const backToSearchBtn = (
            <Button bsStyle="primary" bsSize="large" title="Zurück zur Suche" onClick={this.handleBackToSearch}>
                <span><i className="fa fa-search" aria-hidden={true}></i> Zur Suche</span>
            </Button>
        );

        return (
            <div className="results" lang="de">
                <Row>
                    <Col xs={6} className="back-to-search-wrapper">
                        {backToSearchBtn}
                    </Col>
                </Row>
                {initiated == false &&
                    <div>
                        <br /><i className='fa fa-circle-o-notch fa-spin' /> Lade Ergebnisse
                    </div>
                }
                {(initiated && this.state.buildings.length == 0) &&
                    <div className="entry not-found">
                        <h3><i className="fa fa-exclamation" aria-hidden={true}></i> Keine Gebäude gefunden.</h3>
                        <p>Ändern Sie die Filter der Suche oder den Ausschnitt auf der Karte.</p>
                    </div>
                }
                {this.state.buildings.map((building, bid) => {
                    return (
                        <ResultsEntry key={bid} building={building} stores={this.state.stores} />
                    );
                })}

                {visiblesLength > resultsSteps &&
                    <Row>
                        {resultsPager}
                    </Row>
                }

                {this.state.buildings.length > 3 &&
                    <Row>
                        <br />
                        <Col md={12} className="back-to-search-wrapper">
                            {backToSearchBtn}
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default Results;
