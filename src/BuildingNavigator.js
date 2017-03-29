import React from 'react';
import {Alert} from 'react-bootstrap';
import _ from 'lodash';
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

        this.state = {
            stores: props.stores,
        };
        this.logger = props.logger;
        this.stores = this.state.stores;
        this.eventHandler = props.eventHandler;
        this.handleEvent = this.handleEvent.bind(this);

        /*
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
        React.Component.prototype.stores = this.stores;

        this._isMounted = false;
        this._handleWindowResize = this._handleWindowResize.bind(this);
    }

    /*
    * Componented mounted, do some initial things
    */
    componentDidMount() {
        this._isMounted = true;
        // add resize event listener
        window.addEventListener('resize', this._handleWindowResize);

        // add popstate listener (if user presses browsers back/forward button, get new current route)
        window.addEventListener("popstate", () => {
            this.handleEvent({action: 'get-current-route'});
        }, false);

        // may set if is small view
        if (isMobileBrowser()) {
            this.handleEvent({action: 'update-ui-config',
                payload: {key: 'isSmallView', value: true}
            });
        }

        // load initial buildind data
        this.handleEvent({action: 'init-buildings'});
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this._handleWindowResize);
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
                    this.setState( this.state );
                    resolve(response);
                },
                error => {
                    this.logger.log(error, event, 'error');
                    this.setState( this.state );
                    reject(error);
                }
            );
        });
    }

    /**
     * Window resize event handler
     */
    _handleWindowResize () {
        // test if its a small view, write to state
        if (this._isMounted) {
            const appEl = document.getElementById(this.state.stores.uiStore.get('userConfig').container);
            if (appEl.offsetWidth <= this.stores.uiStore.get('smallViewMax')) {
                if (!this.stores.uiStore.get('isSmallView')) {
                    this.handleEvent({action: 'update-ui-config',
                        payload: {key: 'isSmallView', value: true}
                    });
                }
            } else {
                if (this.stores.uiStore.get('isSmallView')) {
                    this.handleEvent({action: 'update-ui-config',
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
                        <strong>Fehler bei der Ausführung der Anwendung.</strong>
                        {this.logger.getErrors().map((error, eid) => {
                            // @todo may show {error.message.stack} for more information, or point to console?
                            return (
                                <p key={eid}>Nachricht: {error.message.toString()}</p>
                            );
                        })}
                    </Alert>
                }
                {this.stores.uiStore.get('showWelcome') &&
                    <Welcome />
                }
                <Sidebar stores={this.stores} />
                <Map aria-hidden={true} stores={this.stores} />
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
