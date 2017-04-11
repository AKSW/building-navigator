import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {getLogger, getStores, getEventHandler} from './utils/utils';

import Welcome from '../src/components/Welcome';

describe('<Welcome />', () => {

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

});