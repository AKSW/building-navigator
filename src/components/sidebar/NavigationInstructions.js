import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import L from 'leaflet'
import 'leaflet-routing-machine'

/**
 * Component to show the navigation route instructions
 */
class NavigationInstructions extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
        }

        this.formatter = new L.Routing.Formatter({
            language: 'de'
        });

        this.handleChangeRouteProfile = this.handleChangeRouteProfile.bind(this);
        this.handleCloseRoute = this.handleCloseRoute.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores
        });
    }

    /**
     * Remove current route
     */
    handleCloseRoute() {
        super.handleEvent({
            action: 'remove-navigation-route'
        });
    }

    /**
     * Change current routes profile (driving/walking/cycling)
     * @param {String} profile
     */
    handleChangeRouteProfile(profile) {
        super.handleEvent({
            action: 'update-navigation-route-profile',
            payload: { profile }
        });
    }


    render() {
        const navigation = this.state.stores.mapStore.get('navigation');
        const routeObject = this.state.stores.mapStore.getRouteObject();
        const activeRouteIdx = 0;
        const summary = routeObject.routes[activeRouteIdx].summary;
        const fromLocation = navigation.from.title;
        const toLocation = navigation.to.title;

        const routeDistance = this.formatter.formatDistance(summary.totalDistance, -1);
        const routeDuration = this.formatter.formatTime(summary.totalDistance);

        const instructions = (
            <div className="navigation-instructions">
                {routeObject.routes[activeRouteIdx].instructions.map((instruction, id) => {
                    return(
                        <Row className="navigation-instruction-entry" key={id}>
                            {instruction.type !== "DestinationReached" &&
                                <div>
                                    <Col xs={9}>
                                        {instruction.text}
                                    </Col>
                                    <Col xs={3}>
                                        {this.formatter.formatDistance(instruction.distance, -1)}
                                    </Col>
                                </div>
                            }
                            {instruction.type === "DestinationReached" &&
                                <Col xs={12}>
                                    <span><i className="fa fa-map-marker" aria-hidden={true}></i> </span>
                                    {instruction.text}
                                </Col>
                            }
                        </Row>
                    );
                })}
            </div>
        );

        return (
            <div className="navroute-description">
                <Row>
                    <Col xs={12} className="">
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        title="Route Schlie&szlig;en"
                        onClick={this.handleCloseRoute}
                        className="pull-right"
                    >
                        <span><i className="fa fa-times" aria-hidden={true}></i> Schlie&szlig;en</span>
                    </Button>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <h3>Navigation</h3>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        von:
                    </Col>
                    <Col xs={10}>
                        {fromLocation}
                    </Col>
                </Row>

                <Row>
                    <Col xs={2}>
                        nach:
                    </Col>
                    <Col xs={10}>
                        {toLocation}
                    </Col>
                </Row>

                <Row className="navigation-via-wrapper">
                    <Col xs={1}>
                        via
                    </Col>
                    <Col xs={11}>
                        <Button
                            bsStyle="default"
                            title="Route mittels Auto"
                            onClick={e => this.handleChangeRouteProfile('driving')}
                            className={navigation.profile == 'driving' ? 'active' : ''}
                        >
                            <i className="fa fa-car" aria-hidden={true}></i>
                        </Button>
                        <Button
                            bsStyle="default"
                            title="Route mittels Fahrrad"
                            onClick={e => this.handleChangeRouteProfile('cycling')}
                            className={navigation.profile == 'cycling' ? 'active' : ''}
                        >
                            <i className="fa fa-bicycle" aria-hidden={true}></i>
                        </Button>
                        <Button
                            bsStyle="default"
                            title="Route zu Fu&szlig;"
                            onClick={e => this.handleChangeRouteProfile('walking')}
                            className={navigation.profile == 'walking' ? 'active' : ''}
                        >
                            <i className="fa fa-walking" aria-hidden={true}></i>
                        </Button>
                    </Col>
                </Row>

                <Row className="navigation-summary-wrapper">
                    <Col xs={12}>
                        <h4><strong>{routeDistance}, Dauer ca. {routeDuration}</strong></h4>
                    </Col>
                </Row>

                <div className="navigation-instructions-wrapper">
                    <Row>
                        <Col xs={12}>
                            <h3>Wegbeschreibung</h3>
                        </Col>
                    </Row>
                    {instructions}
                </div>

            </div>
        );
    }
}

export default NavigationInstructions;
