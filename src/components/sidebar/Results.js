import React from 'react';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import ResultsEntry from './ResultsEntry';

class Results extends React.Component {
    constructor(props) {
        super();

        this.state = {
            buildings: []
        }

        this.handleBackToSearch = this.handleBackToSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let buildings = nextProps.stores.buildingStore.getVisibles();
        buildings = nextProps.stores.buildingStore.sortByDistance({
            buildings: buildings,
            latitude: nextProps.stores.mapStore.get('center').latitude,
            longitude: nextProps.stores.mapStore.get('center').longitude
        });
        buildings = buildings.slice(0, 10);
        this.setState({
            buildings: buildings
        });        
    }

    handleBackToSearch(e) {
        super.handleEvent({
            action: 'update-ui-config',
            payload: {
                key: 'sidebarRoute',
                value: 'search'
            }
        });
    }

    render() {
        return (
            <div className="results">
                <Row>
                    <Col md={12}>
                        <Button className="btn btn-primary btn-lg" title="Zurück zur Suche" onClick={this.handleBackToSearch}>
                            <span><Glyphicon glyph="search" aria-hidden="true" /> Zur Suche</span>
                        </Button>
                    </Col>
                    <Col md={12}>
                        <p>
                            {this.state.buildings.length} Ergebnisse von {this.props.stores.buildingStore.getVisibles().length}
                        </p>
                    </Col>
                </Row>
                {this.state.buildings.map((building, bid) =>
                    <ResultsEntry key={bid} building={building} />
                )}
            </div>
        );
    }
}

export default Results;
