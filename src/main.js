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
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import mainReducer from './reducers';
import api from './middleware/api';
import getRoutes from './routes';
//import {updatePrevHistoryRoute, updateCurHistoryRoute} from './actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// warn about accessiblity issues
// TODO only in DEV mode, throws react TypeError: ReactDOM.findDOMNode is not a function...
//a11y(React);

const logger = createLogger();
const store = createStore(
    mainReducer,
    undefined, // @todo may add intial values here...
    applyMiddleware(thunk, api, logger) // logger mus be the last middleware
);

/* // gets current route
let curHistoryRoute = '/';
const unlisten = hashHistory.listen(function (location) {
    curHistoryRoute = location.pathname;
});
store.dispatch(updateCurHistoryRoute(curHistoryRoute));*/

ReactDOM.render(
    //<MuiThemeProvider>
        <Provider store={store}>
            <Router history={hashHistory}
                onUpdate={() => {
                    /* // updates current/prev route
                    const state = store.getState();
                    store.dispatch(updatePrevHistoryRoute(state.main.curHistoryRoute));
                    store.dispatch(updateCurHistoryRoute(curHistoryRoute));*/
                    const el = document.getElementById('getFocus');
                    if (el !== null) {
                        window.setTimeout(() => {
                            el.focus();
                        }, 100);
                    }
                }}
            >
                {getRoutes()}
            </Router>
        </Provider>,
    //</MuiThemeProvider>,
  document.getElementById('react')
);
