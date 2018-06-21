import React from 'react';
import {shallow, mount} from 'enzyme';
import {Alert} from 'react-bootstrap';

import {getLogger, getStores, getEventHandler} from '../utils/utils';
import {wrapBuildingNavigator} from '../utils/wrapComponents';

import Welcome from '../../src/components/Welcome';
import Main from '../../src/components/Main';
import Sidebar from '../../src/components/Sidebar';
import Map from '../../src/components/Map';

describe('<Main />', () => {

    it('renders <Welcome /> components', () => {
        const stores = getStores();
        // write logger into React.Component to realize super.logger.hasError() in Main.js
        React.Component.prototype.logger = getLogger();

        const main = shallow(<Main stores={stores} />);
        expect(main.find(Welcome).length).toBe(1);
    })

    it('closes <Welcome /> after clicking ok', () => {
        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // create handleEvent() method in React component  is required, because Welcome calls it as super.handleEvent()
        React.Component.prototype.handleEvent = (event) => {
            return eventHandler.handleEvent(event);
        };

        const main = mount(<Main stores={stores} />);

        expect(main.find(Welcome).find('button').length).toBe(1);

        main.find(Welcome).find('button').simulate('click');

        main.setProps({stores});
        expect(main.find(Welcome).length).toBe(0);
    });

    it('renders <Sidebar /> and <Map /> components', () => {
        const stores = getStores();
        // write logger into React.Component to realize super.logger.hasError() in Main.js
        React.Component.prototype.logger = getLogger();

        const main = shallow(<Main stores={stores} />);
        expect(main.find(Sidebar).length).toBe(1);
        expect(main.find(Map).length).toBe(1);
    })

    it('prints an error message if any exists', () => {
        const logger = getLogger();
        // create dummy error log message
        const error = new Error('This is a TEST error message');
        logger.log(error, {}, 'error');

        const stores = getStores(logger);

        // write logger into React.Component to realize super.logger.hasError() in Main.js
        React.Component.prototype.logger = logger;

        const main = shallow(<Main stores={stores} />);
        expect(main.find(Alert).length).toBe(1);
    });

});
