import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import NoMatch from './components/404';
import App from './containers/App';
import SearchContainer from './containers/SearchContainer';
import ResultsContainer from './containers/ResultsContainer';
import PlaceDetailsContainer from './containers/PlaceDetailsContainer';
import MapContainer from './containers/MapContainer';

export default () => {
    return (
        <div>
            <Route path="/" component={App}>
                <IndexRedirect to="/search" />
                <Route path="/search" component={SearchContainer} />
                <Route path="/results" component={ResultsContainer} />
                <Route path="/map" component={MapContainer} />
                <Route path="/map/:place" component={MapContainer} />
                <Route path="/place/:place" component={PlaceDetailsContainer} />
            </Route>
            <Route path="*" component={NoMatch} />
        </div>
    );
};
