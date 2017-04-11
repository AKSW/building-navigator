import React from 'react';
import {Alert, Image} from 'react-bootstrap';
import Promise from 'promise-polyfill';

import Logger from './utils/Logger';
import {isMobileBrowser} from './utils/DetectMobile';
import EventHandler from './EventHandler';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Welcome from './components/Welcome';

/**
 * Main class, holds stores, logger, eventHandler and renders all other components
 * @class
 */
class BuildingNavigator extends React.Component {
    constructor(props) {
        super();

        // init store state
        this.state = {
            stores: props.stores,
        };
        // set local variables
        this.logger = props.logger;
        this.eventHandler = props.eventHandler;
        this.handleEvent = this.handleEvent.bind(this);
        this.compMounted = false;

        /**
         * Extend Rect.Component with some helper functions from this class,
         * allows components to acces them by calling: super.handleEvent()
         */
        React.Component.prototype.handleEvent = (event) => {
            return new Promise((resolve, reject) => {
                this.handleEvent(event).then(
                    response => resolve(response),
                    error => reject(error)
                );
            });
        };
        React.Component.prototype.logger = this.logger;

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    /**
     * Do some initial work:
     * add event listeners, may set if is mobile browser, init buildings, set route
     */
    componentDidMount() {
        this.compMounted = true;
        // add resize event listener
        window.addEventListener('resize', this.handleWindowResize);

        // add popstate listener (if user presses browsers back/forward button, get new current route)
        window.addEventListener("popstate", () => {
            this.handleEvent({action: 'get-current-route'}).then((route) => {
                if (route.stores !== null) {
                    this.setState({stores: route.stores});
                    this.eventHandler.stores = route.stores;
                }
            });
        }, false);

        // may set if is small view
        if (isMobileBrowser()) {
            this.handleEvent({
                action: 'update-ui-config',
                payload: {key: 'isSmallView', value: true}
            });
        }

        // load initial buildind data
        // and set search as initial route
        this.handleEvent({action: 'init-buildings'}).then(() => {
            super.handleEvent({
                action: 'set-current-route',
                payload: {path: 'search'}
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('popstate');
    }

    /**
     * Pass event to EventHandler and update this state
     *
     * @param Object event with action and data object
     * @return Promise with response or error
     */
    handleEvent(event) {
        return new Promise((resolve, reject) => {
            this.eventHandler.handleEvent(event).then(
                response => {
                    this.setState(this.state);
                    resolve(response);
                },
                error => {
                    this.logger.log(error, event, 'error');
                    this.setState(this.state);
                    reject(error);
                }
            );
        });
    }

    /**
     * Window resize event handler
     */
    handleWindowResize () {
        const isSmallView = this.state.stores.uiStore.get('isSmallView');

        // test if its a small view and write to state (after this app was mounted)
        if (this.compMounted) {
            const appEl = document.getElementById(this.state.stores.uiStore.get('userConfig').container);
            if (appEl.offsetWidth <= this.state.stores.uiStore.get('smallViewMax')) {
                if (!isSmallView) {
                    this.handleEvent({
                        action: 'update-ui-config',
                        payload: {key: 'isSmallView', value: true}
                    });
                }
            } else {
                if (isSmallView) {
                    this.handleEvent({
                        action: 'update-ui-config',
                        payload: {key: 'isSmallView', value: false}
                    });
                }
            }
        }
    }

    render() {
        return (
            <div role="main" className="building-navigator">
                {this.logger.hasError() &&
                    <Alert bsStyle="danger" className="global-error">
                        <h3>Fehler bei der Ausführung der Anwendung</h3>
                        {this.logger.getErrors().map((error, eid) => {
                            return (
                                <p key={eid}>
                                    <strong>Nachricht:</strong><br />{error.message.toString()}<br /><br />
                                    <strong>Details:</strong><br />{error.message.stack}
                                </p>
                            );
                        })}
                    </Alert>
                }
                {this.state.stores.uiStore.get('showWelcome') &&
                    <Welcome />
                }
                <div className="header">
                    <div className="leds-log-wrapper pull-left">
                        <a href="http://www.leds-projekt.de/index.html" target="_blank">
                            <Image src='./images/leds-projekt-logo.png' />
                        </a>
                    </div>
                    <div className="pull-right header-text-wrapper text-muted">
                        <a href="http://www.leds-projekt.de/de/aktuelles/2017/Treffen-mit-Interessenvertretern-zur-Vorstellung-des-Gebaeude-Navigators.html"
                            target="_blank"
                            className="text-muted btn btn-lg">
                            Über
                        </a>
                    </div>
                </div>
                <Sidebar stores={this.state.stores} />
                <Map aria-hidden={true} stores={this.state.stores} />
            </div>
        );
    }
}

BuildingNavigator.propTypes = {
    stores: React.PropTypes.object.isRequired,
    logger: React.PropTypes.instanceOf(Logger).isRequired,
    eventHandler: React.PropTypes.instanceOf(EventHandler).isRequired,
};

export default BuildingNavigator;
