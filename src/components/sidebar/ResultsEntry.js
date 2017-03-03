import React from 'react';
import {
    Row,
    Col,
    Panel,
    PanelGroup,
    Glyphicon,
    Table,
    Button,
    Image
} from 'react-bootstrap'
import A11yIcons from '../A11yIcons';

class Entry extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            building: props.building
        };

        this.handleShowDetails = this.handleShowDetails.bind(this);
    }

    handleShowDetails(e) {
        super.handleEvent({
            action: 'toggle-show-building-details',
            payload: {
                buildingId: e.target.getAttribute('data-building-id'),
            }
        });
        e.preventDefault();
    }

    render() {
        const building = this.state.building;

        return (
            <div id={`result-entry-${building.id}`}>
                <h3>{building.title}</h3>
                <A11yIcons building={building} />
                {building.showDetails &&
                    <Row>
                        <Col md={3}>
                            <strong>Adresse</strong>
                        </Col>
                        <Col md={9}>
                            <address>
                                {building.data.strasse}, {building.data.plz} {building.data.ort}
                            </address>
                        </Col>
                    </Row>
                }
                <span aria-hidden={true}>
                    <a
                        href="#"
                        aria-label="Ort auf Karte zeigen"
                        title="Ort auf Karte zeigen"
                    >
                        <i className="fa fa-map-marker"></i> zeige auf Karte
                    </a>
                </span>
                <div>
                    <a href="#" 
                        data-building-id={building.id}
                        onClick={this.handleShowDetails}
                        className="btn btn-link"
                        aria-label="Ergebnisdetails"
                        aria-expanded={building.showDetails}
                    >
                        {!building.showDetails &&
                            <span data-building-id={building.id}>Details <Glyphicon glyph="chevron-down" /></span>
                        }
                        {building.showDetails &&
                            <span data-building-id={building.id}>Details <Glyphicon glyph="chevron-up" /></span>
                        }
                    </a>
                </div>
            </div>
        );
    }
}

export default Entry;
