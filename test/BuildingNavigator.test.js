import React from 'react';

//import {pushState} from './utils/pushState';

// get mount or shallow object if BuildingNavigator
import {wrapBuildingNavigator} from './utils/wrapComponents';

import Main from '../src/components/Main';

jest.useFakeTimers();

// test-environment for BuildingNavigator component
describe('<BuildingNavigator />', () => {

    it('test if main rendered class .building-navigator', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        expect(buildingNavigator.find('.building-navigator').length).toBe(1);
        buildingNavigator.unmount();
    });

    it('renders <Main /> component', () => {
        const buildingNavigator = wrapBuildingNavigator();
        expect(buildingNavigator.find(Main).length).toBe(1);
    });

    it('expects inital no buildings in state.stores.buildingStore', () => {
        const buildingNavigator = wrapBuildingNavigator();
        expect(buildingNavigator.state().stores.buildingStore.getAll().length).toBe(0);
    });


});
