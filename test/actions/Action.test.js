import React from 'react';
//import * as actions from '../../src/actions/index';

//import Constans from '../../src/Constants';
export const RDFfile = require('raw!../../assets/db.js');

describe('actions', () => {
    it('addPlaces should create ADD_PLACES action', () => {
        const places = [
            {id: 0, uri: 'http://example/1', name: 'My Place'}
        ];
        const expectedAction = {
            type: 'SET_FILTER',
            payload: places
        };
        //expect(actions.addPlaces(places)).toEqual(expectedAction);
    });
});
