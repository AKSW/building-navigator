/*eslint no-unused-vars: 0*/
/*eslint-disable no-console */

import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import Header from '../components/Header';
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
const App = ({params, children, rdfstoreCnct}) => { //rdfstore, initStore
    return (
        <div>
            {!rdfstoreCnct &&
                <div>Init RDFStore...</div>
            }
            {rdfstoreCnct &&
                <div>
                    <Header />
                    <SidebarContainer />
                    {/* render route, e.g. /place/:place as sidebarPlaceDetails */}
                    {children}
                    <MapContainer />
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        rdfstoreCnct: state.rdfstore.connected
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(setupStore()).then(
        response => {
            dispatch(requestPlaces());
        },
        error => {
            //console.log('error...');
        }
    );
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
