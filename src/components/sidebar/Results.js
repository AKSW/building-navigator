import React from 'react';
import {Grid, Row, Col, Button, Pager} from 'react-bootstrap';

import ResultsEntry from './ResultsEntry';
import {getElement} from '../../utils/GuiUtils'

class Results extends React.Component {
    constructor(props) {
        super();

        let buildings = props.stores.buildingStore.getVisibles();

        this.state = {
            stores: props.stores,
            buildings: buildings.slice(
                props.stores.uiStore.get('resultsStart'),
                props.stores.uiStore.get('resultsStart') + props.stores.uiStore.get('resultsSteps')
            )
        }

        this.handleBackToSearch = this.handleBackToSearch.bind(this);
        this.handleNextResults = this.handleNextResults.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let buildings = nextProps.stores.buildingStore.getVisibles();
        /*buildings = nextProps.stores.buildingStore.sortByDistance({
            buildings: buildings,
            latitude: nextProps.stores.mapStore.get('center').latitude,
            longitude: nextProps.stores.mapStore.get('center').longitude
        });*/
        this.setState({
            stores: nextProps.stores,
            buildings: buildings.slice(
                nextProps.stores.uiStore.get('resultsStart'),
                nextProps.stores.uiStore.get('resultsStart') + nextProps.stores.uiStore.get('resultsSteps')
            )
        });
    }

    componentDidMount() {
        getElement(this.state.stores.uiStore.get('userConfig').container, '.entry a').then((firstEl) => {
            firstEl.focus();
        })
    }

    handleBackToSearch(e) {
        super.handleEvent({
            action: 'set-current-route',
            payload: {path: 'search'}
        });
        e.preventDefault();
    }

    handlePrevResults(e) {
        super.handleEvent({
            action: 'prev-results'
        });
        e.preventDefault();
    }

    handleNextResults(e) {
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

    render() {
        const visiblesLength = this.state.stores.buildingStore.getVisibles().length;
        const resultsStart = this.state.stores.uiStore.get('resultsStart');
        const resultsSteps = this.state.stores.uiStore.get('resultsSteps');

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

        return (
            <div className="results" lang="de">
                <Row>
                    <Col xs={6} className="back-to-search-wrapper">
                        <Button className="btn btn-primary btn-lg" title="Zurück zur Suche" onClick={this.handleBackToSearch}>
                            <span><i className="fa fa-search" aria-hidden={true}></i> Zur Suche</span>
                        </Button>
                    </Col>
                </Row>
                {this.state.buildings.length == 0 &&
                    <div className="entry not-found">
                        <h3><i className="fa fa-exclamation" aria-hidden={true}></i> Keine Gebäude gefunden.<br />Ändern sie die Filter der Suche oder den Standpunkt auf der Karte.</h3>
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
                            <Button className="btn btn-primary btn-lg" title="Zurück zur Suche" onClick={this.handleBackToSearch}>
                                <span><i className="fa fa-search" aria-hidden={true}></i> Zur Suche</span>
                            </Button>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

export default Results;
