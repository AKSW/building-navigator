import React from 'react';
import {Route} from 'react-router';
import NoMatch from './components/404';
import App from './containers/App';
import PlaceDetailsContainer from './containers/PlaceDetailsContainer';

export default () => {
    return (
        <div>
            <Route path="/" component={App}>
                <Route path="/place/:place" component={PlaceDetailsContainer} />
            </Route>
            <Route path="*" component={NoMatch} />
        </div>
    );
};
