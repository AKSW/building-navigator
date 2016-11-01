import React from 'react';
import places from '../src/reducers/places';

describe('places reducer', () => {
    const place1 = {
        id: 0,
        uri: 'http://example/1',
        name: 'My Place'
    };
    const place2 = {
        id: 1,
        uri: 'http://example/2',
        name: 'My second Place'
    };

    it('handle inital state', () => {
        expect(
            places(undefined, [])
        ).toEqual({"doRequest": false, "places": [], "selectedPlace": {}});
    });

    /*it('handle ADD_PLACES', () => {
        expect(
            places([], {
                type: 'ADD_PLACES',
                payload: [place1]
            })
        ).toEqual([place1]);

        expect(
            places([], {
                type: 'ADD_PLACES',
                payload: [place1, place2]
            })
        ).toEqual([place1, place2]);

        expect(
            places([place1], {
                type: 'ADD_PLACES',
                payload: [place2]
            })
        ).toEqual([place1, place2]);
    });*/
});
