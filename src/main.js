/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
//import a11y from 'react-a11y';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import mainReducer from './reducers';
import api from './middleware/api';
import getRoutes from './routes';

const BuildingNavigator = (config) => {
    if (! ('container' in config)) {
        throw new Error('Error: "container" id not found');
    }

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    // injectTapEventPlugin();

    // warn about accessiblity issues
    // TODO only in DEV mode, throws react TypeError: ReactDOM.findDOMNode is not a function...
    //a11y(React);

    const logger = createLogger();
    const store = createStore(
        mainReducer,
        undefined, // @todo may add intial values here...
        applyMiddleware(thunk, api, logger) // logger mus be the last middleware
    );

    const state = store.getState();
    state.main.rootNodeId = config.container;
    const appEl = document.getElementById(state.main.rootNodeId);
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory}
                onUpdate={() => {
                    // ...
                }}
            >
                {getRoutes()}
            </Router>
        </Provider>,
        appEl
    );
};

module.exports = BuildingNavigator;
window.BuildingNavigator = BuildingNavigator;
