/*eslint-disable no-console */

/*
@TODO filter ontology
base hasFilter filter1
filter1 type ... (checkbox)
filter1 label xyz
filter1 active bool
filter1 value xyz
...
*/

export const filterSettings = {
    'search': {
        p: 'search',
        active: false,
        value: '',
        type: 'text'
    },
    /* @ TODO better structure, e.g.:
    'liftAvailable': {
        p: 'lift-available',
        o: '"yes"^^<http://www.w3.org/2001/XMLSchema#string>',
        active: false,
        type: 'checkbox'
    },*/
    'liftAvailable': {
        p: 'lift-available',
        active: false,
        type: 'checkbox',
        //value: '"yes"^^<http://www.w3.org/2001/XMLSchema#string>'
        value: 'yes'
    },
    'liftWithWheelChairSupportAvailable': {
        p: 'lift-liftWithWheelChairSupportAvailable',
        active: false,
        type: 'checkbox',
        //value: '"yes"^^<http://www.w3.org/2001/XMLSchema#string>'
        value: 'yes'
    },
    'parkingLotsForDisabledPeopleAvailable': {
        p: 'parkingLot-lotsForDisabledPeopleAvailable',
        active: false,
        type: 'checkbox',
        //value: '"yes"^^<http://www.w3.org/2001/XMLSchema#string>'
        value: 'yes'
    },
    'toiletForDisabledPeopleAvailable': {
        p: 'toilets-toiletForDisabledPeopleAvailable',
        active: false,
        type: 'checkbox',
        //value: '"yes"^^<http://www.w3.org/2001/XMLSchema#string>'
        value: 'yes'
    },
    'category': {
        p: 'category',
        active: false,
        type: 'select',
        options: [
            {value: 'all', text: 'Alle'},
            {value: 'Bildung', text: 'Bildung'},
            {value: 'Unterhaltung', text: 'Unterhaltung'},
            {value: 'Kultur', text: 'Kultur'},
        ],
        value: []
    },
};

const filter = (state = filterSettings, action) => {
    switch (action.type) {
    case 'SET_FILTER':
        const filterObj = {};
        filterObj[action.key] = Object.assign({}, state[action.key], {
            active: action.active,
            value: typeof action.value === 'undefined' ? state[action.key].value : action.value
        });
        return Object.assign({}, state, filterObj);

    default:
        return state;
    }
};

export default filter;
