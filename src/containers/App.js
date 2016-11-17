/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';

import Header from '../components/Header';
import Alert from '../components/Alert';
import SidebarContainer from './SidebarContainer';
import MapContainer from './MapContainer';
import {setupStore, requestPlaces} from '../actions';

/**
Main container of the App, renders main parts and start init of the RDFStore
@method App
@param params {Object}
@param children {Object}
@param rdfstoreCnct {Boolean}
@return {String}
 */
const App = ({params, children, error, rdfstoreCnct}) => { //rdfstore, initStore
    return (
        <div>
            {error &&
                <Alert error={error} />
            }
            {!error && !rdfstoreCnct &&
                <div>Init RDFStore...</div>
            }
            {!error && rdfstoreCnct &&
                <div>
                    <Header />
                    {/*<SidebarContainer />*/}
                    {/* render route, e.g. /place/:place as sidebarPlaceDetails */}
                    <div role="main" id="content">
                        {children}
                    </div>
                    {/*<MapContainer />*/}
                </div>
            }
        </div>
    );
};

const getError = (state) => {
    if (state.rdfstore.error !== undefined) {
        return state.rdfstore.error;
    }
    if (state.places.error !== undefined) {
        return state.places.error;
    }
    return null;
};

const mapStateToProps = (state, ownProps) => {
    return {
        rdfstoreCnct: state.rdfstore.connected,
        error: getError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(setupStore()).then(
        response => {
            dispatch(requestPlaces());
        }
    );
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
