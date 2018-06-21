import React from 'react';
import {Grid, Row, Col, Button, Pager} from 'react-bootstrap';

import ResultsEntry from './ResultsEntry';
import {getElement} from '../../utils/GuiUtils'
import A11yIcon from '../A11yIcon';

/**
 * Result component, renders results list with result entries
 */
class Results extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            buildings: this.getBuildingsSlice(props.stores),
            a11yBuilding: {}
        }

        this.handleBackToSearch = this.handleBackToSearch.bind(this);
        this.handleNextResults = this.handleNextResults.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
            buildings: this.getBuildingsSlice(nextProps.stores),
            a11yBuilding: Object.assign({}, nextProps.stores.buildingStore.buildingDefaults)
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
        // reset current page
        super.handleEvent({
            action: 'goto-results-page',
            payload: {page: 0}
        });
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
        let showedFullMatchTitle, showedPartMatchTitle = false;
        const allFilter = this.state.stores.filterStore.getAll();

        // get pagination navigation
        const resultsPager = (
            <ul className="pager">
                {resultsStart > 0 &&
                    <li className="previous">
                        <a role="button" href="#" onClick={this.handlePrevResults} aria-label="Vorherige Seite">
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp; vorherige Seite
                        </a>
                    </li>
                }
                <li>
                    <span>
                        Seite {(resultsStart+resultsSteps)/resultsSteps} von&nbsp;
                        {Math.ceil(visiblesLength/resultsSteps)}
                    </span>
                </li>
                {(resultsStart + resultsSteps) < visiblesLength &&
                    <li className="next">
                        <a role="button" href="#" onClick={this.handleNextResults} aria-label="Nächste Seite">
                            nächste Seite <i className="fa fa-chevron-right" aria-hidden="true"></i>
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

        // search filter
        const searchFilter = allFilter.find((filter) => {
            return filter.type === 'search';
        });

        // set a11y building properties from selected filter for a11y icons
        allFilter.forEach(filter => {
            if (filter.type === 'select-one') {
                const filterSet = filter.valueSet[filter.value];
                this.state.a11yBuilding[filterSet.key] = filterSet.value;
            }
            if (filter.type === 'checkbox') {
                this.state.a11yBuilding[filter.key] = filter.value;
            }
        });
        const a11yIcons =  new A11yIcon({building: this.state.a11yBuilding});

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
                {initiated &&
                    <div>
                        <Row>
                            <Col xs={12}>
                                <h3>Gefundene Einträge</h3>
                            </Col>
                        </Row>
                        {/* TODO may show input field with onChange handler
                          searchFilter.value != "" &&
                            <Row className="results-header-search">
                                <Col xs={3} className="">
                                    <h3>Suche:</h3>
                                </Col>
                                <Col xs={9} className="">
                                    "{searchFilter.value}"
                                </Col>
                            </Row>
                        */}
                        {(allFilter.some(filter => { return filter.type !== 'search' && filter.value > 0 })) &&
                            <Row className="results-header-filter">
                                <Col xs={6} md={6} className="">
                                    <strong>Gewählte Filter:</strong>
                                </Col>
                                <Col xs={6} md={6} className="">
                                    <ul className="a11yIcons-compact">
                                        {a11yIcons.getAll().map((entry, id) => {
                                            if (a11yIcons.icon(entry) == null) {
                                                return (null);
                                            }
                                            return (<li key={id}>
                                                {a11yIcons.icon(entry)}
                                            </li>);
                                        })}
                                    </ul>
                                </Col>
                            </Row>
                        }
                    </div>
                }
                {(initiated && this.state.buildings.length == 0) &&
                    <div className="entry not-found">
                        <h3><i className="fa fa-exclamation" aria-hidden={true}></i> Keine Gebäude gefunden.</h3>
                        <p>Ändern Sie die Filter der Suche oder den Ausschnitt auf der Karte.</p>
                    </div>
                }
                {this.state.buildings.map((building, bid) => {
                    if (!showedFullMatchTitle && building.searchRank == 2) {
                        showedFullMatchTitle = true;
                        return (
                            <div key={bid}>
                                <Row className="results-search-header">
                                    <Col xs={12} className="">
                                        <h3>Suche "{searchFilter.value}"<br /><small>Treffer enthalten das Wort vollständig</small></h3>
                                    </Col>
                                </Row>
                                <ResultsEntry building={building} stores={this.state.stores} />
                            </div>
                        );
                    }
                    else if (!showedPartMatchTitle && building.searchRank == 1) {
                        showedPartMatchTitle = true;
                        return (
                            <div key={bid}>
                                <Row className="results-search-header">
                                    <Col xs={12} className="">
                                        <h3>Suche "{searchFilter.value}"<br /><small>Treffer enthalten das Wort teilweise</small></h3>
                                    </Col>
                                </Row>
                                <ResultsEntry building={building} stores={this.state.stores} />
                            </div>
                        );
                    } else {
                        return (
                            <ResultsEntry key={bid} building={building} stores={this.state.stores} />
                        );
                    }
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
