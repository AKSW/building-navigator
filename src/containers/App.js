/**
 * @file Main container of the App, renders main parts and start init of the RDFStore
 * @author Simeon Ackermann
 */
/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
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
import {getElementById, focusOnNode} from './Utilities';

import styles from '../main.css';

const App = ({
    children,
    showWelcome,
    //isMapChild,
    error,
    storeCnct,
    onHideWelcomeMsg,
    mouseFocus,
    isSmallView,
    mainState,
    filter
}) => {
    return (
        <div>
            {showWelcome &&
                <WelcomeMessage
                    onHide={e => {
                        onHideWelcomeMsg(filter);
                        focusOnNode(filter.search.node);
                    }}
                    focusOnNode={focusOnNode}
                />
            }

            {error &&
                <Alert error={error} />
            }
            {!error && !storeCnct &&
                <p><i className="fa fa-circle-o-notch fa-spin"></i> Starte Programm...</p>
            }
            {!error && storeCnct &&
                <div role="main" className={styles.mainApp}>
                    <SidebarContainer>
                        {children}
                    </SidebarContainer>
                    {<MapContainer location={children.props.location} />}
                    <img
                        className="hidden"
                        src="./images/blank.gif"
                        onLoad={() => {
                            isSmallView(mainState);
                        }}
                    />
                </div>
            }
        </div>
    );
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
        //showWelcome: Cookies.get('showWelcomeMessage') === 'false' ? false : state.main.showWelcomeMessage,
        showWelcome: state.main.showWelcomeMessage,
        children: ownProps.children,
        //isMapChild: ownProps.location.pathname.match(/^\/map/),
        storeCnct: state.store.connected,
        error: getError(state),
        mainState: state.main,
        filter: state.filter
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
    return {
        onHideWelcomeMsg: (filter) => {
            dispatch(toggleWelcomeMsg());
        },
        // @todo do this somewhere else (a better place/way)
        isSmallView: (mainState) => {
            const appEl = document.getElementById(mainState.rootNodeId);
            if (appEl === null || appEl.offsetWidth <= 0) {
                return;
            }
            dispatch(updateMainState('isSmallView', appEl.offsetWidth <= mainState.smallViewMax));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
