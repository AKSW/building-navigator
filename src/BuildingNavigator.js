import React from 'react';
import _ from 'lodash';

import Logger from './utils/Logger';

import EventHandler from './EventHandler';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

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
            this.handleEvent(event);
        };
        React.Component.prototype.logger = this.logger;
        React.Component.prototype.stores = this.stores;
    }

    /*
    * Component will mount, do actions without sideeffect
    */
    componentWillMount() {
    }

    /*
    * Componented mounted, load initial building data
    */
    componentDidMount() {
        this.handleEvent({action: 'init-buildings'});
    }

    componentWillUpdate() {
        // @todo deep copy causes high cpu load
        //this.logger.log('Current stores: ', _.cloneDeep(this.stores));
        this.logger.log('Current stores: ', this.stores);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    /**
     * Pass event to EventHandler and update this state
     *
     * @param Object event with action and data object
     */
    handleEvent(event) {
        this.logger.log('Handle event: ', event);

        this.eventHandler.handleEvent(event).then(
            response => {
                this.setState( this.state );
            },
            error => {
                this.logger.log(error, event, 'error');
                this.setState( this.state );
            }
        );
    }

    render() {
        return (
            <div className="row">
                {this.logger.hasError() &&
                    <p>Fehler, Beschreibung siehe Konsole.</p>
                }
                <Sidebar stores={this.stores} />
                <Map stores={this.stores} />
            </div>
        );
    }
}

BuildingNavigator.propTypes = {
  stores: React.PropTypes.object.isRequired,
  logger: React.PropTypes.instanceOf(Logger).isRequired
};

export default BuildingNavigator;
