/**
 * @file Main container of the App, renders main parts and start init of the RDFStore
 * @author Simeon Ackermann
 */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {Grid} from 'react-bootstrap';

import Alert from '../components/Alert';
import MapContainer from '../containers/MapContainer';
import Sidebar from '../components/Sidebar';
import WelcomeMessage from '../components/WelcomeMessage';
import {
    setupStore,
    requestPlaces,
    toggleWelcomeMsg,
    toggleSidebar
} from '../actions';

const App = ({
    children,
    showWelcome,
    //isMapChild,
    error,
    rdfstoreCnct,
    sidebarIsVisible,
    onToggleSidebar,
    onHideWelcomeMsg
}) => {
    //children = !isMapChild ? (children) : null;

    return (
        <div>

            {showWelcome &&
                <WelcomeMessage onHide={onHideWelcomeMsg} />
            }

            {error &&
                <Alert error={error} />
            }
            {!error && !rdfstoreCnct &&
                <div>Init RDFStore...</div>
            }
            {!error && rdfstoreCnct &&
                <div role="main" id="content">
                    <Grid fluid={true}>
                        <Sidebar
                            sidebarIsVisible={sidebarIsVisible}
                            onToggleSidebar={onToggleSidebar}
                        >
                            {children}
                        </Sidebar>
                    </Grid>
                    {<MapContainer tabIndex="-1" aria-hidden="true" />}
                </div>
            }
        </div>
    );
};

const getError = (state) => {
    /*if (state.rdfstore.error !== undefined) {
        return state.rdfstore.error;
    }*/
    if (state.places.error !== undefined) {
        return state.places.error;
    }
    return null;
};

const mapStateToProps = (state, ownProps) => {
    //console.log('ownProps:', ownProps);
    return {
        showWelcome: state.main.showWelcomeMessage,
        sidebarIsVisible: state.main.sidebarIsVisible,
        children: ownProps.children,
        //isMapChild: ownProps.location.pathname.match(/^\/map/),
        //rdfstoreCnct: state.rdfstore.connected,
        rdfstoreCnct: true,
        error: getError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    // start setting up store
    /*dispatch(setupStore()).then(
        response => {
            // request places first time
            dispatch(requestPlaces());
        }
    );*/
    //dispatch(requestPlaces());
    return {
        onHideWelcomeMsg: () => {
            dispatch(toggleWelcomeMsg());
        },
        onToggleSidebar: () => {
            dispatch(toggleSidebar());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
