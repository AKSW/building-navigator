/**
  * Component for the filter sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import Swipeable from 'react-swipeable';

const sidebarStyle = {
    position: 'absolute',
    height: '100%',
    top: '0px',
    background: '#f7f7f7',
    zIndex: '9999',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '7px 20px 7px 15px',
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    borderBottomRightRadius: '4px',
    hideSidebar: {
        position: 'absolute',
        zIndex: '9998',
        marginTop: '7px',
        padding: '0',

    },
    showSidebar: {
        position: 'relative',
        display: 'inline-block',
        width: 'auto',
        zIndex: '9998',
        marginTop: '7px',
        marginLeft: '-5px',
        padding: '0',
    },
    button: {
        marginLeft: '-5px',
        padding: '10px 8px',
    }
};

const Sidebar = ({
    children,
    sidebarIsVisible,
    onToggleSidebar,
    updateSidebarRoute
}) => {
    return (
        <div>
            {updateSidebarRoute(children.props.route.path)}
            {sidebarIsVisible &&
                <Swipeable onSwipedLeft={onToggleSidebar}>
                    <div className="sidebar" id="sidebar" style={sidebarStyle}>
                        {/* render route, e.g. /search or /results */}
                        {children}
                    </div>
                    <div className="btn-hide-sidebar" style={sidebarStyle.hideSidebar}>
                        <Button
                            bsClass="btn btn-lg btn-default pull-right"
                            aria-label="Ergebnisliste ausblenden"
                            title="Ergebnisliste ausblenden"
                            onClick={onToggleSidebar}
                        >
                            <i className="fa fa-angle-double-left" aria-hidden={true}></i>
                        </Button>
                    </div>
                </Swipeable>
            }
            {!sidebarIsVisible &&
                <div className="btn-show-sidebar" style={sidebarStyle.showSidebar}>
                    <Button
                        bsStyle="default"
                        bsSize="large"
                        aria-label="Ergebnisliste einblenden"
                        title="Ergebnisliste einblenden"
                        onClick={onToggleSidebar}
                        tabIndex="-1"
                    >
                        <i className="fa fa-angle-double-right" aria-hidden={true}></i>
                    </Button>
                </div>
            }
        </div>
    );
};

export default Sidebar;
