/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import mainReducer from './reducers';
import api from './middleware/api';

import getRoutes from './routes';

const logger = createLogger();
const store = createStore(
    mainReducer,
    undefined, // @TODO add intial values here...
    applyMiddleware(thunk, api, logger) // loger mus be the last middleware
);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={hashHistory}>
                {getRoutes()}
            </Router>
        </Provider>
    </MuiThemeProvider>,
  document.getElementById('react')
);
