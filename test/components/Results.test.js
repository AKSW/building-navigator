import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {_10buildings} from '../assets/10buildings';
import {_buildingData} from '../assets/buildingData';
import {fetch} from '../utils/fetch';

import {getLogger, getStores, getEventHandler} from '../utils/utils';
import {wrapBuildingNavigator} from '../utils/wrapComponents';

import BuildingNavigator from '../../src/BuildingNavigator';
import Sidebar from '../../src/components/Sidebar';
import Search from '../../src/components/sidebar/Search';
import Results from '../../src/components/sidebar/Results';
import ResultsEntry from '../../src/components/sidebar/ResultsEntry';

describe('<Results />', () => {

    it('renders 10 times <ResultsEntry /> after initAll buildings', () => {
        fetch(_10buildings);
        const stores = getStores();

        const promise = stores.buildingStore.initAll().then(() => Promise.resolve());

        return promise.then(() => {

            const results = shallow(
                <Results stores={stores} />
            );

            expect(results.find(ResultsEntry).length).toBe(10);
        });
    })

    it('calls may-load-building-data and toogle-show-building-details on click details button', () => {
        /*
        Create environment for <ResultsEntry />, with stores and eventHandler
        */

        fetch(_10buildings);

        const div = global.document.createElement('div');
        div.setAttribute('id', 'building-navigator');
        global.document.body.appendChild(div);

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        eventHandler.handleEvent({
            action: 'update-ui-config',
            payload: {key: 'userConfig', value: {container: 'building-navigator'}}
        });

        // mock fkt contains calls
        const mockFkt = jest.fn();
        const promise = stores.buildingStore.initAll();

        // fake method for handleEvent
        sinon.stub(eventHandler, 'handleEvent').callsFake((event) => {
            if (event.action === 'init-buildings') {
                return promise;
            } else {
                return Promise.resolve();
            }
        });

        // overwrite React component handleEvent() (used after click toggle btn)
        // and call mock fkt on each call
        React.Component.prototype.handleEvent = (event) => {
            mockFkt(event);
            return eventHandler.handleEvent(event);
        };

        // test after first promise of initAll buildings
        return promise.then(() => {
            const building = stores.buildingStore.getBuilding('0-name');

            const results = mount(
                <ResultsEntry key={0} building={building} stores={stores} />
            );

            results.find('.btn-toogle-result-details').simulate('click');

        }).then(() => {
            // expections after may-load-building-data
            expect(mockFkt.mock.calls.length).toBe(2);

            expect(mockFkt.mock.calls[0][0].action).toBe('may-load-building-data');
            expect(mockFkt.mock.calls[0][0].payload.buildingId).toBe('0-name');

            expect(mockFkt.mock.calls[1][0].action).toBe('toggle-show-building-details');
            expect(mockFkt.mock.calls[1][0].payload.buildingId).toBe('0-name');
        });

    });

    it('after loadBuildingDetails() it shows the building details', () => {
        fetch(_10buildings);

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // test after initAll buildings
        return stores.buildingStore.initAll().then(() => {

            // get first building
            const building = stores.buildingStore.getBuilding('0-name');

            // overwrite jsonLoader on loadBuildingDetails
            fetch(_buildingData);

            stores.buildingStore.showBuildingDetails('0-name');

            // test after loadBuildingData resolves
            return stores.buildingStore.loadBuildingData('0-name').then(() => {

                const results = mount(
                    <ResultsEntry key={0} building={building} stores={stores} />
                );

                expect(results.find('.entry').length).toBe(1);
                expect(results.find('.a11yIcons-detailed').length).toBe(1);
                expect(results.find('.entry-details-prop').length).toBeGreaterThan(1);
            })

        });
    })


    it.skip('on click on show result on map button', () => {

    });

});