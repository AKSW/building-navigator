import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {_10buildings} from './assets/10buildings';
import {fetch} from './utils/fetch';
import {getLogger, getStores, getEventHandler} from './utils/utils';
import {wrapBuildingNavigator} from './utils/wrapComponents';

import BuildingNavigator from '../src/BuildingNavigator';
import Map from '../src/components/Map';
import Marker from '../src/components/map/Marker';

describe('<Map />', () => {

    // we cannot mount the map as root node! (see: https://github.com/PaulLeCam/react-leaflet/issues/246)

    it('renders markers', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');

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
            buildingNavigator.update();
            // currently all buildings are on the same location -> it one grouped marker
            expect(buildingNavigator.find(Marker).length).toBe(1);
        });
    })

});
