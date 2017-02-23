import React from 'react';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

//jest.unmock('../src/utils/JsonLoader');

import Logger from '../src/utils/Logger';
import BuildingStore from '../src/stores/BuildingStore';
import FilterStore from '../src/stores/FilterStore';
import MapStore from '../src/stores/MapStore';
import UIStore from '../src/stores/UIStore';

import BuildingNavigator from '../src/BuildingNavigator';
import Sidebar from '../src/components/Sidebar';
import Map from '../src/components/Map';

const buildingCoords = `{
    "0-name":{"category":"Bildung","title":"My first Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "1-name":{"category":"Bildung","title":"My second Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "2-name":{"category":"Bildung","title":"My third Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "3-name":{"category":"Bildung","title":"My fourth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "4-name":{"category":"Bildung","title":"My fifth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "5-name":{"category":"Bildung","title":"My sixth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":1,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "6-name":{"category":"Bildung","title":"My seventh Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":1,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "7-name":{"category":"Bildung","title":"My eighth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":1,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "8-name":{"category":"Bildung","title":"My ninth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":1,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
    "9-name":{"category":"Bildung","title":"My tenth Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":1,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":false,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0}
}`;

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, buildingCoords)));

describe('<BuildingNavigator />', () => {

    const logger = new Logger();
    const stores = {
        buildingStore: new BuildingStore(logger),
        filterStore: new FilterStore(logger),
        mapStore: new MapStore(logger),
        uiStore: new UIStore(logger)
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

    const buildingStore = new BuildingStore();

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