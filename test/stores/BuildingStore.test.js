import React from 'react';
import Promise from 'promise-polyfill';

import BuildingStore from '../../src/stores/BuildingStore';

import {_10buildings} from '../assets/10buildings';
import {fetch} from '../fetch';

fetch(_10buildings);

describe('BuildingStore()', () => {

    const buildingStore = new BuildingStore();

    it('creates an empty store', () => {
        expect(buildingStore.getAll().length).toBe(0);
        expect(buildingStore.getVisibles().length).toBe(0);
    });

    it('inits 10 buildings', () => {
        return buildingStore.initAll()
            .then((count) => {
                expect(count).toBe(10);
                expect(buildingStore.getAll().length).toBe(10);
                expect(buildingStore.getVisibles().length).toBe(10);
            });
    });

    const buildingStore1 = new BuildingStore();
    const filter1 = [
        {
            uniqueKey: 'lift-avail',
            value: 1
        }
    ];

    it('applies `lift-avail` filter', () => {
        return buildingStore1.initAll()
            .then((data) => {
                buildingStore1.applyFilters(filter1);
                expect(buildingStore1.getAll().length).toBe(10);
                expect(buildingStore1.getVisibles().length).toBe(5);
            });
    });

    const buildingStore2 = new BuildingStore();
    const filter2 = [
        {
            uniqueKey: 'title',
            value: 'my first title'
        }
    ];

    it('it applies `title` filter', () => {
        return buildingStore2.initAll()
            .then((data) => {
                buildingStore2.applyFilters(filter2);
                expect(buildingStore2.getAll().length).toBe(10);
                expect(buildingStore2.getVisibles().length).toBe(1);
            });
    });

});
