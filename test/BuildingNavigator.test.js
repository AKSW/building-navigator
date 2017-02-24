import React from 'react';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

//jest.unmock('../src/utils/JsonLoader');
import {_10buildings} from './assets/10buildings';
import {fetch} from './fetch';

import Logger from '../src/utils/Logger';

import * as Store from '../src/stores';

import BuildingNavigator from '../src/BuildingNavigator';
import Sidebar from '../src/components/Sidebar';
import Map from '../src/components/Map';


fetch(_10buildings);

describe('<BuildingNavigator />', () => {

    const logger = new Logger();
    const stores = {
        buildingStore: new Store.BuildingStore(logger),
        filterStore: new Store.FilterStore(logger),
        mapStore: new Store.MapStore(logger),
        uiStore: new Store.UIStore(logger)
    };

    it('renders <Sidebar /> and <Map /> components', () => {
        const wrapper = shallow(<BuildingNavigator stores={stores} logger={logger} />);
        expect(wrapper.find(Sidebar).length).toBe(1);
        expect(wrapper.find(Map).length).toBe(1);
    });

    it('expects inital empty buildings in buildingStore', () => {
        const wrapper = mount(<BuildingNavigator stores={stores} logger={logger} />);
        expect(wrapper.state().stores.buildingStore.getAll().length).toBe(0);
    });

    const buildingStore = new Store.BuildingStore();

    it('inits 10 buildings', () => {
        return buildingStore.initAll();
    });

    it('expects 10 buildings in buildingStore', () => {
        stores.buildingStore = buildingStore
        const wrapper = mount(<BuildingNavigator stores={stores} logger={logger} />);
        
        wrapper.update();

        expect(wrapper.state().stores.buildingStore.getAll().length).toBe(10);

        //console.log(wrapper.find('li').length);
    });

});