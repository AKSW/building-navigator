import React from 'react';
import sinon from 'sinon';
import Promise from 'promise-polyfill';
import {shallow, mount} from 'enzyme';

import {getLogger, getStores, getEventHandler} from '../utils/utils';
import {wrapBuildingNavigator} from '../utils/wrapComponents';

import Sidebar from '../../src/components/Sidebar';
import Search from '../../src/components/sidebar/Search';

describe('<Search />', () => {

    it('adds loader icon after submit search', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const search = buildingNavigator.find(Search);

        expect(search.find('.fa-spin').length).toBe(0);
        search.find('form').simulate('submit');
        expect(search.find('.fa-spin')).toBeDefined();
    });

    it('changes entrance filter', () => {
        const buildingNavigator = wrapBuildingNavigator('mount');
        const search = buildingNavigator.find(Search);

        expect(buildingNavigator.state().stores.filterStore.getFilter('entrance').value).toBe(0);

        search.find('select[name="entrance"]').simulate('change', {target: {
            getAttribute() { return 'entrance' },
            value : 1
        }});

        // update buildingNavigators state after change
        buildingNavigator.update();

        expect(buildingNavigator.state().stores.filterStore.getFilter('entrance').value).toBe(1);
    });

    it('calls apply-filters and set-current-route (results) after submit', () => {
        const stores = getStores();

        // mock fkt, contains calls
        const mockFkt = jest.fn();
        const promise = Promise.resolve();

        // overwrite React.handleEvent()
        React.Component.prototype.handleEvent = (event) => {
            mockFkt(event);
            return promise;
        };

        const search = mount(
            <Search stores={stores} />
        );

        search.find('form').simulate('submit');

        // test after first promise, because set-current-route is first called after resolve of apply-filters
        return promise.then(() => {
            expect(mockFkt.mock.calls.length).toBe(2);
            expect(mockFkt.mock.calls[0][0].action).toBe('apply-filters');
            expect(mockFkt.mock.calls[1][0].action).toBe('set-current-route');
            expect(mockFkt.mock.calls[1][0].payload.path).toBe('results');
        });
    })

});