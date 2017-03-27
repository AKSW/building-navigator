import React from 'react';
import {
    Row,
    Col,
    Panel,
    PanelGroup,
    Glyphicon,
    Table,
    Button,
    ButtonGroup,
    Image
} from 'react-bootstrap'
import A11yIcon from '../A11yIcon';

class Entry extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            building: props.building
        };

        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.handleHideDetails = this.handleHideDetails.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleShowOnMap = this.handleShowOnMap.bind(this);
        this.handleMayHideSidebar = this.handleMayHideSidebar.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
            building: nextProps.building
        });
    }

    handleShowDetails(e, buildingId, useToggle = true) {
        super.handleEvent({
            action: 'may-load-building-data',
            payload: {
                buildingId: buildingId,
            }
        }).then(() => {
            if (useToggle) {
                super.handleEvent({
                    action: 'toggle-show-building-details',
                    payload: {
                        buildingId: buildingId,
                    }
                });
            } else {
                super.handleEvent({
                    action: 'show-building-details',
                    payload: {
                        buildingId: buildingId,
                    }
                });
            }
        });
        e.preventDefault();
    }

    handleHideDetails(e, buildingId) {
        super.handleEvent({
            action: 'toggle-show-building-details',
            payload: {
                buildingId: buildingId,
            }
        });
        e.preventDefault();
    }

    handleMouseOver(e) {
        // @todo may show entry on map
    }

    handleShowOnMap(e, building) {
        // close may prev opened popups
        const mapNode = this.state.stores.mapStore.getNode();
        if (mapNode != null) {
            mapNode.closePopup();
        }
        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {
                buildingId: building.id,
            }
        });
        e.preventDefault();
    }

    handleMayHideSidebar(e) {
        if (this.state.stores.uiStore.get('isSmallView') && this.state.stores.uiStore.get('sidebarIsVisible')) {
            super.handleEvent({
                action: 'hide-sidebar'
            });
        }
        e.preventDefault();
    }

    render() {
        const building = this.state.building;
        const entryClass = building.selectOnMap ? "entry current-entry" : "entry";

        const a11yIcons = new A11yIcon({building: building});

        return (
            <div id={`result-entry-${building.id}`} className={entryClass} onMouseOver={this.handleMouseOver} lang="de">
                <h3><a href="#" onClick={e => {this.handleShowOnMap(e, building); this.handleShowDetails(e, building.id, false);}}>{building.title}</a></h3>
                {!building.showDetails &&
                    <ul className="a11yIcons-list">
                        {a11yIcons.getAll().map((entry, id) => {
                            return (<li key={id}>
                                {a11yIcons.icon(entry)}
                            </li>);
                        })}
                    </ul>
                }
                {building.showDetails &&
                    <div>
                        <div className="a11yIcons-detailed">
                            {a11yIcons.getAll().map((entry, id) => {
                                return (
                                    <Row key={id}>
                                        <Col xs={3} aria-hidden={true}>{a11yIcons.icon(entry)}</Col>
                                        <Col xs={9} className="a11yIcons-descr">{a11yIcons.descr(entry)}</Col>
                                    </Row>
                                );
                            })}
                        </div>

                        {building.data.beschreibung_hilfestellungen_vor_ort !== "" &&
                            <Row className="entry-details-prop">
                                <Col xs={3} className="entry-details-prop-label">
                                    <i className="fa fa-info" title="Hinweis"></i>
                                </Col>
                                <Col xs={9}>
                                    {building.data.beschreibung_hilfestellungen_vor_ort.split("\n").map((p, i) => {
                                        return <span key={i}>{p}<br /></span>;
                                    })}
                                </Col>
                            </Row>
                        }

                        <Row className="entry-details-prop">
                            <Col xs={3} className="entry-details-prop-label">
                                    <i className="fa fa-address-card" title="Adresse"></i>
                                </Col>
                            <Col xs={9}>
                                <address>
                                    {building.data.strasse}, {building.data.plz} {building.data.ort}
                                </address>
                            </Col>
                        </Row>

                        {building.data.oeffnungszeiten !== "" &&
                            <Row className="entry-details-prop">
                                <Col xs={3} className="entry-details-prop-label">
                                    <i className="fa fa-clock-o" title="Öffnungszeiten"></i>
                                </Col>
                                <Col xs={9}>
                                    {building.data.oeffnungszeiten.split("\n").map((p, i) => {
                                        return <span key={i}>{p}<br /></span>;
                                    })}
                                </Col>
                            </Row>
                        }

                    </div>
                }
                <ButtonGroup justified className="result-bottom-buttons">
                    {!building.showDetails &&
                        <Button className="btn-lg" aria-label="Mehr Ergebnisdetails" aria-expanded={false} onClick={e => this.handleShowDetails(e, building.id)}>
                            <i className="fa fa-caret-down" aria-hidden={true}></i> Details
                        </Button>
                    }

                    {building.showDetails &&
                        <Button className="btn-lg" aria-label="Weniger Ergebnisdetails" aria-expanded={true} onClick={e => this.handleHideDetails(e, building.id)}>
                            <i className="fa fa-caret-up" aria-hidden={true}></i> Details
                        </Button>
                    }
                    <Button className="btn-lg" aria-hidden={true} onClick={e => {this.handleMayHideSidebar(e); this.handleShowOnMap(e, building)}}>
                        <i className="fa fa-map-marker"></i> zeige auf Karte
                    </Button>
                </ButtonGroup>

            </div>
        );
    }
}

export default Entry;
