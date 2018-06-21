import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {getLogger, getStores, getEventHandler} from './utils/utils';

import Welcome from '../src/components/Welcome';

describe('<Welcome />', () => {

    it('renders select fields', () => {

        const welcome = mount(
            <Welcome />
        );
        expect(welcome.find('select').length).toBe(1);
    })

    it('renders ok-button', () => {

        const welcome = mount(
            <Welcome />
        );
        expect(welcome.find('button').length).toBe(1);
    })

    it('applies filter "blind" on change select', () => {

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // create handleEvent() method in React component
        // is required, because Welcome calls it as super.handleEvent()
        React.Component.prototype.handleEvent = (event) => {
            return eventHandler.handleEvent(event);
        };

        const welcome = mount(
            <Welcome />
        );

        expect(stores.filterStore.getFilter('blind').value).toBe(0);

        welcome.find('select').simulate('change', {target: {
            value : 'blind'
        }});

        expect(stores.filterStore.getFilter('blind').value).toBe(1);
    })

    it('applies filter "move" on change select', () => {

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // create handleEvent() method in React component
        // is required, because Welcome calls it as super.handleEvent()
        React.Component.prototype.handleEvent = (event) => {
            return eventHandler.handleEvent(event);
        };

        const welcome = mount(
            <Welcome />
        );

        expect(stores.filterStore.getFilter('entrance').value).toBe(0);
        expect(stores.filterStore.getFilter('lift').value).toBe(0);
        expect(stores.filterStore.getFilter('toilet').value).toBe(0);

        welcome.find('select').simulate('change', {target: {
            value : 'move'
        }});

        expect(stores.filterStore.getFilter('entrance').value).toBe(1);
        expect(stores.filterStore.getFilter('lift').value).toBe(2);
        expect(stores.filterStore.getFilter('toilet').value).toBe(2);
    })

    it('applies filter "hearing" on change select', () => {

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // create handleEvent() method in React component
        // is required, because Welcome calls it as super.handleEvent()
        React.Component.prototype.handleEvent = (event) => {
            return eventHandler.handleEvent(event);
        };

        const welcome = mount(
            <Welcome />
        );

        expect(stores.filterStore.getFilter('hearing').value).toBe(0);

        welcome.find('select').simulate('change', {target: {
            value : 'hear'
        }});

        expect(stores.filterStore.getFilter('hearing').value).toBe(1);
    })

});