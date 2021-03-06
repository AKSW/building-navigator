import React from 'react';
import {
    Row,
    Col,
    Button,
    ButtonGroup
} from 'react-bootstrap'
import A11yIcon from '../A11yIcon';

import {getElement} from '../../utils/GuiUtils'

let handleMouseOutTimeout = null;
let handleMouseOverTimeout = null;
let mouseOverBuilding = null;

/**
 * Results entry component, renders a result with title, a11y icons and details
 */
class Entry extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
            building: props.building,
            a11yIcons: new A11yIcon({building: props.building}),
            a11yIconShowDetails: {},
            isLoading: false
        };

        // dont show a11yicon details on start
        this.state.a11yIcons.getAll().map((entry, id) => {
            this.state.a11yIconShowDetails[entry] = false;
        });

        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.handleHideDetails = this.handleHideDetails.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleShowOnMap = this.handleShowOnMap.bind(this);
        this.handleMayHideSidebar = this.handleMayHideSidebar.bind(this);
        this.a11yIconToggleShowDetails = this.a11yIconToggleShowDetails.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
            building: nextProps.building
        });
    }

    /**
     * Toggle details of a entry
     *
     * @param {Boolean} useToggle, if false force show building details (instead toggle it)
     */
    handleShowDetails(e, buildingId, useToggle = true) {
        this.setState({isLoading: true});

        // first we may need to load the building details
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
            // finished, focus on the result
            this.setState({isLoading: false});
            getElement(this.state.stores.uiStore.get('userConfig').container, `[id="result-entry-${buildingId}"] a`).then((entry) => {
                entry.focus();
            });
        });
        e.preventDefault();
    }

    /**
     * Hide entry details (call toggle-show-building-details)
     */
    handleHideDetails(e, buildingId) {
        super.handleEvent({
            action: 'toggle-show-building-details',
            payload: {
                buildingId: buildingId,
            }
        });
        e.preventDefault();
    }

    /**
     * Handles mouse hovers entry
     * @param {Event} e
     * @param {Object} building
     */
    handleMouseOver(e, building) {
        clearTimeout(handleMouseOutTimeout);

        if (mouseOverBuilding == building.id) return;

        handleMouseOverTimeout = setTimeout(() => {
            mouseOverBuilding = building.id;
            super.handleEvent({
                action: 'set-hovered-on-map',
                payload: { buildingId: building.id }
            });
            if (building.selectOnMap !== true) {
                super.handleEvent({
                    action: 'set-selected-on-map',
                    payload: { buildingId: null }
                });
            }
        }, 200);

        e.preventDefault();
    }

    /**
     * Handles mouse leaves entry
     * @param {Event} e
     * @param {Object} building
     */
    handleMouseOut(e, building) {
        const self = this;
        clearTimeout(handleMouseOverTimeout);

        handleMouseOutTimeout = setTimeout(() => {
            mouseOverBuilding = null;
            super.handleEvent({
                action: 'set-hovered-on-map',
                payload: { buildingId: null }
            });
        }, 100);

        e.preventDefault();
    }

    /**
     * Show entry on map (call set-selected-on-map)
     */
    handleShowOnMap(e, building) {
        // close may prev opened popups
        this.state.stores.mapStore.closePopup();

        super.handleEvent({
            action: 'set-selected-on-map',
            payload: {
                buildingId: building.id,
            }
        });
        e.preventDefault();
    }

    /**
     * Hide sidebar if is small view
     */
    handleMayHideSidebar(e) {
        if (this.state.stores.uiStore.get('isSmallView') && this.state.stores.uiStore.get('sidebarIsVisible')) {
            super.handleEvent({
                action: 'hide-sidebar'
            });
        }
        e.preventDefault();
    }

    /**
     * Toggle details of an a11y icon
     */
    a11yIconToggleShowDetails(e, name) {
        const a11yIconShowDetails = this.state.a11yIconShowDetails;
        a11yIconShowDetails[name] = ! a11yIconShowDetails[name];
        this.setState({ a11yIconShowDetails });
        e.preventDefault();
    }

    /**
     * Render entry, with title, icons and may details (address, note, ...)
     */
    render() {
        const building = this.state.building;
        const a11yIcons = this.state.a11yIcons;
        const entryClass = building.selectOnMap ? "entry current-entry" : "entry";

        return (
            <div id={`result-entry-${building.id}`} className={entryClass} lang="de"
                onMouseOver={e => {this.handleMouseOver(e, building)}}
                onMouseOut={e => {this.handleMouseOut(e, building)}}
            >
                <h3><a href="#" onClick={e => {this.handleShowOnMap(e, building); this.handleShowDetails(e, building.id, false);}}>{building.title}</a></h3>
                {!building.showDetails &&
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
                }
                {building.showDetails &&
                    <div>
                        <div className="a11yIcons-extended">
                            {a11yIcons.getAll().map((entry, id) => {
                                return (
                                    <Row key={id}>
                                        <Col xs={3} aria-hidden={true}>{a11yIcons.icon(entry)}</Col>
                                        <Col xs={9} className="a11yIcons-descr">
                                            {a11yIcons.descr(entry)}
                                            {(a11yIcons.details(entry) !== null && this.state.a11yIconShowDetails[entry] === false) &&
                                                <Button className="btn-link btn-toogle-a11y-details" aria-label="Deails" aria-expanded={false} onClick={e => this.a11yIconToggleShowDetails(e, entry)}>
                                                    <i className="fa fa-chevron-down" aria-hidden={true}></i> Details
                                                </Button>
                                            }
                                            {a11yIcons.details(entry) !== null &&
                                                <Col className="a11yIcons-details">
                                                    {this.state.a11yIconShowDetails[entry] === true &&
                                                        <div>{a11yIcons.details(entry)}</div>
                                                    }
                                                </Col>
                                            }
                                        </Col>
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
                        <Button className="btn-lg btn-toogle-result-details" aria-label="Mehr Ergebnisdetails" aria-expanded={false} onClick={e => this.handleShowDetails(e, building.id)}>
                            <i className="fa fa-caret-down" aria-hidden={true}></i> Details anzeigen&nbsp;
                            {this.state.isLoading &&
                                <i className='fa fa-circle-o-notch fa-spin' />
                            }
                        </Button>
                    }

                    {building.showDetails &&
                        <Button className="btn-lg btn-toogle-result-details" aria-label="Weniger Ergebnisdetails" aria-expanded={true} onClick={e => this.handleHideDetails(e, building.id)}>
                            <i className="fa fa-caret-up" aria-hidden={true}></i> Details ausblenden
                        </Button>
                    }
                    <Button className="btn-lg btn-show-result-on-map" aria-hidden={true} onClick={e => {this.handleMayHideSidebar(e); this.handleShowOnMap(e, building)}}>
                        <i className="fa fa-map-marker"></i> zeige auf Karte
                    </Button>
                </ButtonGroup>

            </div>
        );
    }
}

export default Entry;
