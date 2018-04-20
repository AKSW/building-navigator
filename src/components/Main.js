import React from 'react'
import {Alert, Image} from 'react-bootstrap';

import NotFound from './NotFound';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Map from './Map';

/**
 * Main root component, renders sub-components like Welcome, Sidebar and Map
 *
 * Renders global error messages if existing
 */
class Main extends React.Component {
    constructor(props) {
        super();

        this.state = {
            stores: props.stores,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores,
        });
    }

    render() {
        const currentRoute = this.state.stores.routerStore.getCurrentRoute();

        return (
            <div role="main" className="building-navigator">
                {super.logger.hasError() &&
                    <Alert bsStyle="danger" className="global-error">
                        <h1>Fehler bei der Ausführung der Anwendung</h1>
                        {super.logger.getErrors().map((error, eid) => {
                            return (
                                <p key={eid}>
                                    <strong>Nachricht:</strong><br />{error.message.toString()}<br /><br />
                                    <strong>Details:</strong><br />{error.message.stack}
                                </p>
                            );
                        })}
                    </Alert>
                }

                {this.state.stores.uiStore.get('loader') &&
                    <div className="global-loader-wrapper">
                        <i className='fa fa-circle-o-notch fa-spin' /> Loading Buildings...
                    </div>
                }

                {this.state.stores.uiStore.get('showWelcome') &&
                    <Welcome />
                }

                {(currentRoute.component === 'Search' || currentRoute.component === 'Results') &&
                    <div className="content">
                        <Sidebar stores={this.state.stores} />
                        <Map stores={this.state.stores} />
                    </div>
                }

                {currentRoute.component === 'NotFound' &&
                    <div className="content">
                        <NotFound />
                    </div>
                }
            </div>
        );
    }
}

export default Main;
