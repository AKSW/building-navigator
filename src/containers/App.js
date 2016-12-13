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
} from '../actions';

const App = ({
    children,
    showWelcome,
    //isMapChild,
    error,
    rdfstoreCnct,
    onHideWelcomeMsg,
    mouseFocus
}) => {
    return (
        <div>

            {showWelcome &&
                <WelcomeMessage onHide={onHideWelcomeMsg} />
            }

            {!showWelcome &&
                mouseFocus('formDistrict')
            }

            {error &&
                <Alert error={error} />
            }
            {!error && !rdfstoreCnct &&
                <div>Init RDFStore...</div>
            }
            {!error && rdfstoreCnct &&
                <div role="main">
                    <SidebarContainer>
                        {children}
                    </SidebarContainer>
                    {<MapContainer />}
                </div>
            }
        </div>
    );
};

const setMouseFocus = (elId) => {
    window.setTimeout(() => {
        const el = document.getElementById(elId);
        if (el !== null) {
            el.focus();
        }
    }, 100);
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
    return {
        showWelcome: Cookies.get('showWelcomeMessage') === 'false' ? false : state.main.showWelcomeMessage,
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
            Cookies.set('showWelcomeMessage', false);
            setMouseFocus('formDistrict');
        },
        mouseFocus: (elId) => {
            setMouseFocus(elId);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
