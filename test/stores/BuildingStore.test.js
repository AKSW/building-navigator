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

    it.skip('loads data of a building', () => {
        // example building
        const building = `{
            "0-name":{"category":"Bildung","title":"My first Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0}
        }`;
        // mock fetch the building
        fetch(building);

        const stores = getStores();

        // tests after init building
        return stores.buildingStore.initAll().then(() => {

            // expects building without data
            expect(Object.keys(stores.buildingStore.getBuilding('0-name').data).length).toBe(0);

            // mock jsonLoader on loadBuildingDetails
            fetch(_buildingData);

            // load building data
            return stores.buildingStore.loadBuildingData('0-name').then(() => {
                // expects building with some keys in data
                expect(Object.keys(stores.buildingStore.getBuilding('0-name').data).length).toBeGreaterThan(1);
            });

        });
    });

    it.skip('applies filter "entrance" (call applyFilters())', () => {
        // two building, one matches the entrance=1 filter
        const buildings = `{
            "0-name":{"category":"Bildung","title":"My first Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
            "1-name":{"category":"Bildung","title":"My second Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":1,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0}
        }`;
        // mock fetch the two buildings
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

    it.skip('applies bounds of the map to the buildings', () => {
         // lat/long bounds (upper right bounds are bigger)
        const bounds = {
            northEast: {
                latitude: 52.0000,
                longitude: 21.0000
            },
            southWest: {
                latitude: 50.0000,
                longitude: 19.0000
            }
        };
        // two buildings, second building is in the upper bounds
        const buildings = `{
            "0-name":{"category":"Bildung","title":"My first Title","longitude":0,"latitude":0,"entrance-suit-f-wheelchair":0,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0},
            "1-name":{"category":"Bildung","title":"My second Title","longitude":20.0000,"latitude":51.0000,"entrance-suit-f-wheelchair":1,"lift-suit-f-wheelchair":0,"lift-avail":0,"toilet-avail":0,"toilet-suit-f-wheelchair":0,"parking-avail":0,"parking-f-disabled-avail":0,"help-for-hearing-imp":0,"help-for-blind":0,"general-help":0}
        }`;
        // mock fetch the two buildings
        fetch(buildings);

        const stores = getStores();

        // tests after init buildings
        return stores.buildingStore.initAll().then(() => {
            expect(stores.buildingStore.getAll().length).toBe(2);
            expect(stores.buildingStore.getVisibles().length).toBe(2);

            stores.buildingStore.applyBounds(bounds.northEast, bounds.southWest);

            expect(stores.buildingStore.getAll().length).toBe(2);
            expect(stores.buildingStore.getVisibles().length).toBe(1);
        });
    });

});
