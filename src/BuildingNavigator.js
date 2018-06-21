import React from 'react';
import Promise from 'promise-polyfill';
import PropTypes from 'prop-types';

import Logger from './utils/Logger';
import {isMobileBrowser} from './utils/DetectMobile';
import EventHandler from './EventHandler';
import Main from './components/Main';

/**
 * Logical main class of the app, controls dataflow between components and stores
 *
 * Holds stores, logger and event handler
 * Passes events with handleEvent from components to the event handler and updates its state after the event
 *      Updated state will be passed to the components
 * Extends super class React.Component with logger and handleEvent method
 *      This allows components to call then with:
 *      super.logger.log() and super.handleEvent(event)
 * Do some initial work, like loading building data and if small window
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
        this.compMounted = false; // requiered to test initial window size

        // Extend Rect.Component with handleEvent() method
        // allows components to call events with: super.handleEvent(...)
        React.Component.prototype.handleEvent = (event) => {
            return new Promise((resolve, reject) => {
                this.handleEvent(event).then(
                    response => resolve(response),
                    error => reject(error)
                );
            });
        };
        // Write logger into React.Component, allows components to access it with: super.logger.log(...)
        React.Component.prototype.logger = this.logger;

        // bind local handlers
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handlePopstate = this.handlePopstate.bind(this);
        this.updateMapBounds = this.updateMapBounds.bind(this);
    }

    /**
     * Do some initial work:
     * add event listeners, may set if is mobile browser, init buildings, may set route
     */
    componentDidMount() {
        const self = this;
        this.compMounted = true;

        // add resize event listener
        window.addEventListener('resize', this.handleWindowResize);

        // add popstate listener (if user presses browsers back/forward button, get new current route)
        window.addEventListener("popstate", this.handlePopstate, false);

        // may set if is small view
        if (isMobileBrowser()) {
            this.handleEvent({
                action: 'update-ui-config',
                payload: {key: 'isSmallView', value: true}
            });
        }

        // load initial buildind data, apply map bounds to the buildings and set initial route
        this.handleEvent({action: 'init-buildings'}).then(() => {
            this.updateMapBounds();
            // apply bounds to the buildings
            super.handleEvent({action: 'apply-bounds'});
        }).catch(error => {});

        // hide global loader after this component is mounted
        this.handleEvent({
            action: 'update-ui-config',
            payload: {key: 'loader', value: false}
        });

        // get current path and set as initial route
        // e.g. sets Search as index component, or 404 if not found
        const currentRoute =this.state.stores.routerStore.getCurrentRoute();
        super.handleEvent({
            action: 'set-current-route',
            payload: {path: currentRoute.path}
        });

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.removeEventListener('popstate', this.handlePopstate);
    }

    /**
     * Pass event to EventHandler and update my own state
     *
     * @param Object event with action and data object (see EventHandler)
     * @return Promise with response or error
     */
    handleEvent(event) {
        return new Promise((resolve, reject) => {
            // handle event and resolve promise or reject on error
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

    /**
     * Popstate listener. Handles browsers history back function
     */
    handlePopstate () {
        const newStores = this.state.stores;
        newStores.filterStore.filters = history.state.filters;
        newStores.mapStore.config = history.state.map;
        newStores.uiStore.config = history.state.ui;

        this.setState({stores: newStores});
        this.eventHandler.stores = newStores;

        // update map config, bounds and apply filter and bounds to buildings
        super.handleEvent({
            action: 'update-map-config',
            payload: newStores.mapStore.config
        });
        super.handleEvent({action: 'apply-filters'});
        // apply bounds after map moved to new bounds
        window.setTimeout(() => {
            this.updateMapBounds();
            super.handleEvent({action: 'apply-bounds'});
        }, 500);


        // set browsers title (required for FF)
        document.title = history.state.title;
    }

    /**
     * Update bounds on maps config
     */
    updateMapBounds() {
        const mapNode = this.state.stores.mapStore.getNode();
        if (mapNode !== null) {
            const mapBounds = mapNode.getBounds().pad(this.state.stores.mapStore.get('mapPadding'));
            // update map bounds config
            super.handleEvent({action: 'update-map-bound',
                payload: {
                    northEast: {
                        latitude: mapBounds._northEast.lat,
                        longitude: mapBounds._northEast.lng,
                    },
                    southWest: {
                        latitude: mapBounds._southWest.lat,
                        longitude: mapBounds._southWest.lng
                    }
                }
            });
        }
    }

    render() {
        return <Main stores={this.state.stores} />;
    }
}

BuildingNavigator.propTypes = {
    stores: PropTypes.object.isRequired,
    logger: PropTypes.instanceOf(Logger).isRequired,
    eventHandler: PropTypes.instanceOf(EventHandler).isRequired,
};

export default BuildingNavigator;
