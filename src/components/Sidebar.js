/**
  * Component for the filter sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

const Sidebar = ({children, sidebarIsVisible, onToggleSidebar}) => {
    return (
        <div>
            {sidebarIsVisible &&
                <Row>
                    <Col xs={11} md={3} className="sidebar">
                        {/* render route, e.g. /place/:place as sidebarPlaceDetails */}
                        {children}
                    </Col>
                    <Col xs={1} md={1} xsOffset={11} mdOffset={3} className="btn-hide-sidebar">
                        <Button
                            bsStyle="default"
                            bsSize="large"
                            aria-label="Ergebnisliste ausblenden"
                            title="Ergebnisliste ausblenden"
                            onClick={onToggleSidebar}
                            tabIndex="-1"
                        >
                            <Glyphicon glyph="triangle-left" aria-hidden="true" />
                        </Button>
                    </Col>
                </Row>
            }
            {!sidebarIsVisible &&
                <div className="btn-show-sidebar">
                    <Button
                        bsStyle="default"
                        bsSize="large"
                        aria-label="Ergebnisliste einblenden"
                        title="Ergebnisliste einblenden"
                        onClick={onToggleSidebar}
                        tabIndex="-1"
                    >
                        <Glyphicon glyph="triangle-right" aria-hidden="true" />
                    </Button>
                </div>
            }
        </div>
    );
};

export default Sidebar;
