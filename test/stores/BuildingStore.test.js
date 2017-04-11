import React from 'react';
import Promise from 'promise-polyfill';

import {getLogger, getStores, getEventHandler} from '../utils/utils';
import {_10buildings} from '../assets/10buildings';
import {fetch} from '../utils/fetch';

describe('BuildingStore()', () => {

    it('store is empty on beginning', () => {
        const stores = getStores();

        expect(stores.buildingStore.getAll().length).toBe(0);
        expect(stores.buildingStore.getVisibles().length).toBe(0);
    });

    it('inits 10 buildings', () => {
        fetch(_10buildings);
        const stores = getStores();

        return stores.buildingStore.initAll().then((count) => {
            expect(count).toBe(10);
            expect(stores.buildingStore.getAll().length).toBe(10);
            expect(stores.buildingStore.getVisibles().length).toBe(10);
        });
    });

    it.skip('load building data', () => {

    });

    it('applies filter "entrance" (call applyFilters())', () => {
        // two building, one matches the entrance=1 filter
        const buildings = `{
            "0-name":{"category":"Bildung","title":"My first Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
            "1-name":{"category":"Bildung","title":"My second Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":1,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0}
        }`;
        // fetch the two buildings
        fetch(buildings);

        const stores = getStores();

        // tests after init buildings
        return stores.buildingStore.initAll().then(() => {
            // update entrance filter to 1
            stores.filterStore.update('entrance', 1);
            // apply filter to buildings
            stores.buildingStore.applyFilters(stores.filterStore.getAll());

            expect(stores.buildingStore.getAll().length).toBe(2);
            expect(stores.buildingStore.getVisibles().length).toBe(1);
        });
    });

    it.skip('apply map bounds to buildings', () => {
        // @todo create lat/long in buildings, create fake map
    });

});
