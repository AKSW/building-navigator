/*eslint-disable no-console */

/*
export const accessibilityFilters = {
  return [
    'elevator', 'toilet', ...
  ];
};
*/

export const filterSettings = {
    district: {
        filter: undefined, // district is not a filter!
        value: [
            {
                id: 'center',
                active: true,
                lat: 51.3412,
                lng: 12.3747,
                label: 'Leipzig - Zentrum'
            },
            {
                id: 'north',
                active: false,
                lat: 51.364498,
                lng: 12.367856,
                label: 'Leipzig - Nord'
            },
            {
                id: 'east',
                active: false,
                lat: 51.332767,
                lng: 12.403157,
                label: 'Leipzig - Ost'
            },
            {
                id: 'south',
                active: false,
                lat: 51.307803,
                lng: 12.375401,
                label: 'Leipzig - Süd'
            },
            {
                id: 'west',
                active: false,
                lat: 51.337170,
                lng: 12.339277,
                label: 'Leipzig - West'
            }
        ]
    },
    search: {
        active: false,
        filter: 'titel',
        value: ''
    },
    category: {
        filter: [],
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'Alle',
                aria: 'Aria Label...'
            },
            {
                id: 'bildung',
                active: false,
                filter: 'kategorie',
                value: 'Bildung',
                label: 'Bildung',
                aria: 'Aria Label...'
            },
            {
                id: 'kultur',
                active: false,
                filter: 'kategorie',
                value: 'Kultur',
                label: 'Kultur',
                aria: 'Aria Label...'
            },
            {
                id: 'unterhaltung',
                active: false,
                filter: 'kategorie',
                value: 'Unterhaltung',
                label: 'Unterhaltung',
                aria: 'Aria Label...'
            }
        ]
    },
    elevator: {
        filter: [],
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'keine Einschränkung',
                aria: 'Aria Label...'
            },
            {
                id: 'personenaufzug_vorhanden',
                active: false,
                filter: 'personenaufzug_vorhanden',
                value: 'ja',
                label: 'Aufzug ist vorhanden',
                aria: '...'
            },
            {
                id: 'personenaufzug_rollstuhlgerecht',
                active: false,
                filter: 'personenaufzug_rollstuhlgerecht',
                value: 'ja',
                label: 'Aufzug ist rollstuhlgerecht',
                aria: '...'
            }
        ]
    },
    hilfeHoergesch: {
        active: false,
        filter: 'hilfe_fuer_hoergeschaedigte',
        value: 'ja'
    },
    /*elevatorAll: {
        active: false,
        value: '',
        filter: '',
    },
    elevatorCabineIsAvailable: {
        active: false,
        value: 'ja',
        filter: '?elevatorCabineIsAvailable = "%s"'
    },
    elevatorIsWheelchairAccessible: {
        active: false,
        value: 'ja',
        filter: '?elevatorIsWheelchairAccessible = "%s"'
    },
    toiletIsAvailable: {
        active: false,
        value: '',
        filter: ''
    },
    toiletIsWheelchairAccessible: {
        active: false,
        value: '',
        filter: ''
    },
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
    },*/
};

const filter = (state = filterSettings, action) => {
    switch (action.type) {
    case 'UPDATE_FILTER':
        const newState = {};
        // update string (like search) filter
        if (typeof state[action.filterId].filter === 'string') {
            newState[action.filterId] = Object.assign({}, state[action.filterId], {
                active: action.active,
                value: action.value === null ? state[action.filterId].value : action.value
            });
        }
        // update option filter, set all options to false except current selection
        else {
            const filterOptions = state[action.filterId].value.map((option) => {
                if (option.id === action.optionId) {
                    option.active = action.active;
                    return option;
                }
                option.active = false;
                return option;
            });
            newState[action.filterId] = Object.assign({}, state[action.filterId], filterOptions);
        }
        return Object.assign({}, state, newState);
    /*case 'SET_FILTER':
        const filterObj = {};
        if (typeof state[action.key].value === 'string') {
            filterObj[action.key] = Object.assign({}, state[action.key], {
                active: action.active,
                value: typeof action.value === 'undefined' ? state[action.key].value : action.value
            });
        } else {
            const filterObjValue = state[action.key].value.map((option) => {
                if (option.value === action.value) {
                    option.active = true;
                    return option;
                }
                option.active = false;
                return option;
            });
            filterObj[action.key] = Object.assign({}, state[action.key], {
                active: action.active,
                value: filterObjValue
            });
        }
        return Object.assign({}, state, filterObj);
    */
    default:
        return state;
    }
};

export default filter;

export const getActiveFilterOption = (groupFilter) => {
    return groupFilter.value.filter((option) => {
        return option.active;
    })[0];
};
