import React from 'react';
import {shallow, mount} from 'enzyme';

import Logger from '../../src/utils/Logger';
import BuildingStore from '../../src/stores/BuildingStore';
import FilterStore from '../../src/stores/FilterStore';
import MapStore from '../../src/stores/MapStore';
import UIStore from '../../src/stores/UIStore';

import BuildingNavigator from '../../src/BuildingNavigator';

import Sidebar from '../../src/components/Sidebar';

import Search from '../../src/components/sidebar/Search';
import Results from '../../src/components/sidebar/Results';

describe('<Sidebar />', () => {

    const logger = new Logger();
    const stores = {
        buildingStore: new BuildingStore(logger),
        filterStore: new FilterStore(logger),
        mapStore: new MapStore(logger),
        uiStore: new UIStore(logger)
    };

    it('renders <Search />', () => {
        const wrapper = shallow(<Sidebar stores={stores} />);
        expect(wrapper.find(Search).length).toBe(1);        
        expect(wrapper.find(Results).length).toBe(0);
    });

    it('renders <Results /> after submit search', () => {
        const wrapper = mount(<BuildingNavigator stores={stores} logger={logger} />);
        wrapper.find('form').simulate('submit');
        wrapper.update();
        expect(wrapper.find(Search).length).toBe(0);
        expect(wrapper.find(Results).length).toBe(1);
    });

});