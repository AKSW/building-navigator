/**
 * @file Main container of the App, renders main parts and start init of the RDFStore
 * @author Simeon Ackermann
 */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import Cookies from 'js-cookie';

import Alert from '../components/Alert';
import MapContainer from '../containers/MapContainer';
import SidebarContainer from '../containers/SidebarContainer';
import WelcomeMessage from '../components/WelcomeMessage';
import {
    setupStore,
    requestPlaces,
    toggleWelcomeMsg,
    updateMainState
} from '../actions';

import styles from '../main.css';

const App = ({
    children,
    showWelcome,
    //isMapChild,
    error,
    storeCnct,
    onHideWelcomeMsg,
    mouseFocus,
    doCheckIfSmallDisplay
}) => {
    return (
        <div>

            {showWelcome &&
                <WelcomeMessage onHide={onHideWelcomeMsg} />
            }

            {!showWelcome &&
                mouseFocus('formFilterSearch')
            }

            {doCheckIfSmallDisplay()}

            {error &&
                <Alert error={error} />
            }
            {!error && !storeCnct &&
                <div>Init RDFStore...</div>
            }
            {!error && storeCnct &&
                <div role="main" className={styles.mainApp}>
                    <SidebarContainer>
                        {children}
                    </SidebarContainer>
                    {<MapContainer location={children.props.location} />}
                </div>
            }
        </div>
    );
};

const setMouseFocus = (elId) => {
    /** @todo find a way to test after dom rendered instead timeout! */
    window.setTimeout(() => {
        const el = document.getElementById(elId);
        if (el !== null) {
            el.focus();
        }
    }, 100);
};

const checkIfSmallDisplay = () => {
    /** @todo find a way to test after dom rendered instead timeout! */
    /*window.setTimeout(() => {
        const appEl = document.getElementById('react');
        const sidebarEl = document.getElementById('sidebar');
        console.log('App-Sidebar verhältnis: ', appEl.offsetWidth, sidebarEl.offsetWidth);

    }, 100);*/
    return new Promise((resolve, reject) => {
        /** @todo find a way to test after dom rendered instead timeout! */
        window.setTimeout(() => {
            const appEl = document.getElementById('react');
            const sidebarEl = document.getElementById('sidebar');
            console.log('App-Sidebar verhältnis: ', appEl.offsetWidth, sidebarEl.offsetWidth);
            resolve(appEl.offsetWidth - sidebarEl.offsetWidth);
            return;
        }, 100);
    });
};

const getError = (state) => {
    if (state.store.error !== undefined) {
        return state.store.error;
    }
    if (state.places.error !== undefined) {
        return state.places.error;
    }
    return null;
};

const mapStateToProps = (state, ownProps) => {
    return {
        showWelcome: Cookies.get('showWelcomeMessage') === 'false' ? false : state.main.showWelcomeMessage,
        children: ownProps.children,
        //isMapChild: ownProps.location.pathname.match(/^\/map/),
        storeCnct: state.store.connected,
        error: getError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    // start setting up store
    dispatch(setupStore()).then(
        response => {
            // request places first time
            //dispatch(requestPlaces());
        }
    );
    //dispatch(requestPlaces());
    return {
        onHideWelcomeMsg: () => {
            dispatch(toggleWelcomeMsg());
            Cookies.set('showWelcomeMessage', false);
        },
        mouseFocus: (elId) => {
            setMouseFocus(elId);
        },
        doCheckIfSmallDisplay: () => {
            checkIfSmallDisplay().then(
                response => {
                    console.log(response);
                }
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
