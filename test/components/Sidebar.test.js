import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';
import Swipeable from 'react-swipeable';

import {getLogger, getStores, getEventHandler} from '../utils/utils';

import {wrapBuildingNavigator} from '../utils/wrapComponents';

import * as Store from '../../src/stores';
import EventHandler from '../../src/EventHandler';
import Logger from '../../src/utils/Logger';

import BuildingNavigator from '../../src/BuildingNavigator';
import Main from '../../src/components/Main';
import Sidebar from '../../src/components/Sidebar';
import Search from '../../src/components/sidebar/Search';
import Results from '../../src/components/sidebar/Results';

jest.useFakeTimers();

describe('<Sidebar />', () => {

    it('renders <Swipeable />', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const sidebar = buildingNavigator.find(Sidebar);

        expect(sidebar.find(Swipeable).length).toBe(1);
    })

    it('click on toggle-sidebar-button should toggle the <Sidebar />', () => {
        const logger = getLogger();
        const stores = getStores(logger);
        const eventHandler = getEventHandler(stores, logger);

        // create super handleEvent and logger is required, because Main needs it
        React.Component.prototype.handleEvent = (event) => {
            return eventHandler.handleEvent(event);
        };
        React.Component.prototype.logger = logger;

        const main = mount(<Main stores={stores} />);

        expect(main.find('.sidebar').length).toBe(1);
        expect(main.find(Sidebar).find('.btn-toggle-sidebar button').length).toBe(1);

        main.find(Sidebar).find('.btn-toggle-sidebar button').simulate('click');

        main.setProps({stores});
        expect(main.find('.sidebar').length).toBe(0);
    });

    it('renders <Search /> by default (not <Results />)', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const sidebar = buildingNavigator.find(Sidebar);

        expect(sidebar.find(Search).length).toBe(1);
        expect(sidebar.find(Results).length).toBe(0);
    });

    it('renders <Search /> if current route is search', () => {
        const stores = getStores();

        const resultRoute = stores.routerStore.getRoute('search');
        // overwrite routerStore.getCurrentRoute(), to return search route
        stores.routerStore.getCurrentRoute = () => {
            return resultRoute;
        }

        const sidebar = shallow(
            <Sidebar stores={stores} />
        );

        expect(sidebar.find(Search).length).toBe(1);
        expect(sidebar.find(Results).length).toBe(0);
    });

    it('renders <Results /> if current route is results', () => {
        const stores = getStores();

        const resultRoute = stores.routerStore.getRoute('results');
        // overwrite routerStore.getCurrentRoute(), to return result route
        stores.routerStore.getCurrentRoute = () => {
            return resultRoute;
        }

        const sidebar = shallow(
            <Sidebar stores={stores} />
        );

        expect(sidebar.find(Search).length).toBe(0);
        expect(sidebar.find(Results).length).toBe(1);
    });

});
