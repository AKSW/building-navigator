/**
  * Component for the filter sidebar
  */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import Swipeable from 'react-swipeable';

import styles from './sidebar.css';

const Sidebar = ({
    children,
    onToggleSidebar,
    mainState
}) => {

    const sidebarHtml = mainState.sidebarIsVisible ? (
        <Swipeable onSwipedLeft={onToggleSidebar}>
            <div className={styles.sidebar} id="sidebar"
                ref={node => {
                    /** @todo test (old) browser compatibility with saving node in state */
                    mainState.sidebarNode = node;
                }}
            >
                {/* render route, e.g. /search or /results */}
                {children}
            </div>
            <div className={styles.btnHideSidebar}>
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
    ) : (
        <div className={styles.btnShowSidebar}>
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
    );
    return (sidebarHtml);
};

export default Sidebar;
