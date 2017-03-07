import React from 'react';
import _ from 'lodash';
import Promise from 'promise-polyfill';

import Logger from './utils/Logger';
import {getUserGeolocation} from './utils/GeoUtils';
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
            //buildingStore: new BuildingStore(),
            //filterStore: new FilterStore()
        };
        this.logger = props.logger;
        this.stores = this.state.stores;
        this.eventHandler = new EventHandler(this.state.stores, this.logger);
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
    }

    /*
    * Componented mounted, do some initial things
    */
    componentDidMount() {
        // if geolocate successed, center map
        // @todo animate new map center with map.setView(...)
        getUserGeolocation().then(
            response => {
                this.handleEvent({
                    action: 'update-map-center',
                    payload: {
                        latitude: response.latitude,
                        longitude: response.longitude,
                    }
                });
            }
        );

        // load initial buildind data
        this.handleEvent({action: 'init-buildings'});
    }

    componentWillUpdate() {
        // @todo deep copy causes high cpu load
        //this.logger.log('Current stores: ', _.cloneDeep(this.stores));
        this.logger.log('Current stores: ', this.stores);
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

    render() {
        return (
            <div className="building-navigator">
                {this.logger.hasError() &&
                    <p>Fehler ...</p>
                }
                {this.stores.uiStore.get('showWelcome') &&
                    <Welcome />
                }
                <Sidebar stores={this.stores} />
                {this.stores.uiStore.get('globalDisability') !== "blind" &&
                    <Map stores={this.stores} />
                }
            </div>
        );
    }
}

BuildingNavigator.propTypes = {
  stores: React.PropTypes.object.isRequired,
  logger: React.PropTypes.instanceOf(Logger).isRequired
};

export default BuildingNavigator;
