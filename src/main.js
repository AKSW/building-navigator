/*eslint no-unused-vars: 0*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import buildingNavigator from './reducers';
import App from './components/App';

//import getRoutes from './routes';

let store = createStore(buildingNavigator);

const NoMatch = React.createClass({
    render() {
        return (
            <div>
                <h1>404 - Not found.</h1>
            </div>
        );
    }
});

/*ReactDOM
    .render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>,
        document.getElementById('react'));
*/

/*const Routes = (
    <Router history={hashHistory}>
    {getRoutes()}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {Routes}
  </Provider>,
  document.getElementById('react')
);*/

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
);
