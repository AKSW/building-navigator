import React from 'react';
import Promise from 'promise-polyfill';

import mockedAxios from 'axios';

import {getLogger, getStores, getEventHandler} from '../utils/utils';

import _10buildings from '../assets/10-buildungs-index'
//import {_10buildings} from '../assets/10buildings';
//import {_buildingData} from '../assets/buildingData';
//import {fetch} from '../utils/fetch';


describe('BuildingStore()', () => {

    it('store is empty on beginning', () => {
        const stores = getStores();

        expect(stores.buildingStore.getAll().length).toBe(0);
        expect(stores.buildingStore.getVisibles().length).toBe(0);
    });

    it('inits 10 buildings', async () => {
        const stores = getStores();

        mockedAxios.mockImplementationOnce(() => {
            return Promise.resolve({ data: _10buildings });
        })

        const buildings = await stores.buildingStore.initAll();

        expect(buildings).toBe(10);
        expect(stores.buildingStore.getAll().length).toBe(10);
        expect(stores.buildingStore.getVisibles().length).toBe(10);
    });

});
