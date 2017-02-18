import React from 'react';
import Promise from 'promise-polyfill';

import BuildingStore from '../src/stores/BuildingStore';

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

describe('BuildingStore', () => {

    const buildingStore = new BuildingStore();

    it('Empty BuildingStore', () => {
        expect(buildingStore.getAll().length).toBe(0);
        expect(buildingStore.getVisibles().length).toBe(0);
    });

    it('Init 10 BuildingStore', () => {
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

    it('BuildingStore apply lift-avail filter', () => {
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

    it('BuildingStore apply lift-avail filter', () => {
        return buildingStore2.initAll()
            .then((data) => {
                buildingStore2.applyFilters(filter2);
                expect(buildingStore2.getAll().length).toBe(10);
                expect(buildingStore2.getVisibles().length).toBe(1);
            });
    });

});
