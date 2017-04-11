import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {_10buildings} from './assets/10buildings';
import {getLogger, getStores, getEventHandler} from './utils/utils';
import {fetch} from './utils/fetch';

// get mount or shallow object if BuildingNavigator
import {wrapBuildingNavigator} from './utils/wrapComponents';

import runBuildingNavigator from '../src/main'
import * as Store from '../src/stores';
import EventHandler from '../src/EventHandler';
import Logger from '../src/utils/Logger';

import BuildingNavigator from '../src/BuildingNavigator';
import Welcome from '../src/components/Welcome';
import Sidebar from '../src/components/Sidebar';
import Map from '../src/components/Map';

// test-environment for BuildingNavigator component
describe('<BuildingNavigator />', () => {

    it('test if main rendered class .building-navigator', () => {
        fetch(_10buildings);

        const div = global.document.createElement('div');
        div.setAttribute('id', 'building-navigator');
        global.document.body.appendChild(div);

        runBuildingNavigator({container: 'building-navigator'});
        expect(document.querySelectorAll('.building-navigator').length).toBe(1);
    });

    it('renders <Welcome /> component', () => {
        const buildingNavigator = wrapBuildingNavigator();
        expect(buildingNavigator.find(Welcome).length).toBe(1);
    });

    it('closes <Welcome /> after clicking ok', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');

        buildingNavigator.find(Welcome).find('button').simulate('click');

        // wait for states update
        buildingNavigator.update();
        expect(buildingNavigator.find(Welcome).length).toBe(0);
    });

    it('renders <Sidebar /> and <Map /> components', () => {
        const buildingNavigator = wrapBuildingNavigator();
        expect(buildingNavigator.find(Sidebar).length).toBe(1);
        expect(buildingNavigator.find(Map).length).toBe(1);
    });

    it('expects inital no buildings in state.stores.buildingStore', () => {
        const buildingNavigator = wrapBuildingNavigator();
        expect(buildingNavigator.state().stores.buildingStore.getAll().length).toBe(0);
    });

    it('expects 10 buildings after \'init-buildings\' event in buildingStore', () => {
        const buildingNavigator = wrapBuildingNavigator();

        const eventHandler = buildingNavigator.instance().eventHandler;

        // create promise for initall()
        const promise = buildingNavigator.state().stores.buildingStore.initAll();

        // fake handleEvent()
        sinon.stub(eventHandler, 'handleEvent').callsFake((event) => {
            if (event.action === 'init-buildings') {
                return promise;
            } else {
                return Promise.resolve();
            }
        });

        // initAll() is an async method, so we test after promise resolves
        return promise.then(() => {
            expect(buildingNavigator.state().stores.buildingStore.getAll().length).toBe(10);
        });
    });

});