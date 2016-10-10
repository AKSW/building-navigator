import React from 'react';
import {Route} from 'react-router';
import App from './components/App';

const NotFound = React.createClass({
    render() {
        return (
            <div>
                <h1>404 - Not found.</h1>
            </div>
        );
    }
});

export default () => {
    return (
        <Route path="/" component={App}>
            <Route path="*" component={NotFound}/>
        </Route>
    );
};
