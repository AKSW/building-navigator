import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

//import {_10buildings} from '../assets/10buildings';
//import {_buildingData} from '../assets/buildingData';
//import {fetch} from '../utils/fetch';

import mockedAxios from 'axios';
import _10buildings from '../assets/10-buildungs-index'
import buildingData from '../assets/buildingDataNew'

import {getLogger, getStores, getEventHandler} from '../utils/utils';
import {wrapBuildingNavigator} from '../utils/wrapComponents';

import BuildingNavigator from '../../src/BuildingNavigator';
import Sidebar from '../../src/components/Sidebar';
import Search from '../../src/components/sidebar/Search';
import Results from '../../src/components/sidebar/Results';
import ResultsEntry from '../../src/components/sidebar/ResultsEntry';

jest.useFakeTimers();

describe('<Results />', () => {

    it('renders 10 times <ResultsEntry /> after initAll buildings', async () => {
        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // wee need the building-navigator root container in the Results component
        const div = global.document.createElement('div');
        div.setAttribute('id', 'building-navigator');
        global.document.body.appendChild(div);

        eventHandler.handleEvent({
            action: 'update-ui-config',
            payload: {key: 'userConfig', value: {container: 'building-navigator'}}
        });

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: _10buildings });
        })

        const buildings = await stores.buildingStore.initAll();

        const results = mount(
            <Results stores={stores} />
        );

        expect(results.find(ResultsEntry).length).toBe(10);
    })

    it('click on details calls "may-load-building-data" ', async () => {
        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // wee need the building-navigator root container in the Results component
        const div = global.document.createElement('div');
        div.setAttribute('id', 'building-navigator');
        global.document.body.appendChild(div);

        eventHandler.handleEvent({
            action: 'update-ui-config',
            payload: {key: 'userConfig', value: {container: 'building-navigator'}}
        });

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: _10buildings });
        })

        const buildings = await stores.buildingStore.initAll();

        const results = mount(
            <Results stores={stores} />
        );

        const mockFkt = jest.fn();

        React.Component.prototype.handleEvent = (event) => {
            mockFkt(event);
            return eventHandler.handleEvent(event);
        };

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: buildingData });
        })

        results.find('.btn-toogle-result-details').first().simulate('click');

        expect(mockFkt.mock.calls[0][0].action).toBe('may-load-building-data');
        expect(mockFkt.mock.calls[0][0].payload.buildingId).toBe('a-and-o-hotel-and-hostel-leipzig-gmbh-brandenburger-str.-2-04103-leipzig-46bed7ea');
    })

    it('show building details after loadBuildingDetails', async () => {
        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // wee need the building-navigator root container in the Results component
        const div = global.document.createElement('div');
        div.setAttribute('id', 'building-navigator');
        global.document.body.appendChild(div);

        eventHandler.handleEvent({
            action: 'update-ui-config',
            payload: {key: 'userConfig', value: {container: 'building-navigator'}}
        });

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: _10buildings });
        })

        const buildings = await stores.buildingStore.initAll();

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: buildingData });
        })

        const promise = await stores.buildingStore.loadBuildingData('a-and-o-hotel-and-hostel-leipzig-gmbh-brandenburger-str.-2-04103-leipzig-46bed7ea');

        stores.buildingStore.showBuildingDetails('a-and-o-hotel-and-hostel-leipzig-gmbh-brandenburger-str.-2-04103-leipzig-46bed7ea');

        const results = mount(
            <Results stores={stores} />
        );

        //expect(results.find('.entry').length).toBe(1);
        expect(results.find('.a11yIcons-extended').length).toBe(1);
        expect(results.find('.entry-details-prop').length).toBeGreaterThan(1);
    })

});