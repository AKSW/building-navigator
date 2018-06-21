import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

//import {_10buildings} from './assets/10buildings';
//import {fetch} from './utils/fetch';
import mockedAxios from 'axios';
import _10buildings from './assets/10-buildungs-index'

import {getLogger, getStores, getEventHandler} from './utils/utils';
import {wrapBuildingNavigator} from './utils/wrapComponents';

import BuildingNavigator from '../src/BuildingNavigator';
import Map from '../src/components/Map';
import Marker from '../src/components/map/Marker';

jest.useFakeTimers();

describe('<Map />', () => {

    it('renders markers', async () => {

        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        const map = mount(
            <Map stores={stores} logger={logger} eventHandler={eventHandler} />
        );

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: _10buildings });
        })

        const promise = await stores.buildingStore.initAll();

        expect(map.find(Marker).length).toBe(0);
        map.setProps({stores});
        expect(map.find(Marker).length).toBe(10);
    });


});
