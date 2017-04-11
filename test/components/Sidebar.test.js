import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {getLogger, getStores, getEventHandler} from '../utils/utils';

import {wrapBuildingNavigator} from '../utils/wrapComponents';

import * as Store from '../../src/stores';
import EventHandler from '../../src/EventHandler';
import Logger from '../../src/utils/Logger';

import BuildingNavigator from '../../src/BuildingNavigator';
import Sidebar from '../../src/components/Sidebar';
import Search from '../../src/components/sidebar/Search';
import Results from '../../src/components/sidebar/Results';

describe('<Sidebar />', () => {

    it('click on toggle-sidebar-button should toggle the <Sidebar />', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const sidebar = buildingNavigator.find(Sidebar);

        buildingNavigator.find('.btn-toggle-sidebar button').simulate('click');
        buildingNavigator.update();
        expect(buildingNavigator.find('.sidebar').length).toBe(0);
    });

    it('renders <Search /> by default (not <Results />)', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const sidebar = buildingNavigator.find(Sidebar);

        expect(sidebar.find(Search).length).toBe(1);
        expect(sidebar.find(Results).length).toBe(0);
    });

    it('renders <Results /> if current route is results', () => {
        const stores = getStores();

        const resultRoute = stores.routerStore.getRoute('results');
        stores.routerStore.getCurrentRoute = () => {
            return resultRoute;
        }

        const sidebar = shallow(
            <Sidebar stores={stores} />
        );

        expect(sidebar.find(Search).length).toBe(0);
        expect(sidebar.find(Results).length).toBe(1);
    });

    it.skip('renders <Results /> after submit search', () => {
        // I wasnt able to test this, because the set-current-route event after submit the form
        // calls the browser history object, which seems not available in jest test environment
    });

});