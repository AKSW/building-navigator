/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import NoMatch from './components/404';
import App from './containers/App';
import SearchContainer from './containers/SearchContainer';
import ResultsContainer from './containers/ResultsContainer';
import PlaceContainer from './containers/PlaceContainer';
//import MapContainer from './containers/MapContainer';

const enterMain = (nextState) => {
    const appEl = document.getElementById('react');
    const sidebarEl = document.getElementById('sidebar');
    console.log('TODO: check visible map view also after TOGGLE_SIDEBAR');
    console.log('Entering ROUTE, state:', nextState, 'appEl: ', appEl, ' sidebar: ', sidebarEl);
};

export default (store) => {
    console.log('store: ', store);
    return (
        <div>
            <Route path="/" component={App} onEnter={enterMain}>
                <IndexRedirect to="/search" />
                <Route path="/search" component={SearchContainer} />
                <Route path="/results" component={ResultsContainer} />
                {/** @todo may implement /map route later
                <Route path="/map" component={MapContainer} />
                <Route path="/map/:place" component={MapContainer} />*/}
                <Route path="/place/:place" component={PlaceContainer} />
            </Route>
            <Route path="*" component={NoMatch} />
        </div>
    );
};
