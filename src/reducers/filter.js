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
                id: 'all',
                active: true,
                lat: 51.3412,
                lng: 12.3747,
                zoom: 13,
                label: 'Leipzig'
            },
            {
                id: 'center',
                active: false,
                lat: 51.3412,
                lng: 12.3747,
                zoom: 15,
                label: 'Leipzig - Zentrum'
            },
            {
                id: 'north',
                active: false,
                lat: 51.364498,
                lng: 12.367856,
                zoom: 15,
                label: 'Leipzig - Nord'
            },
            {
                id: 'east',
                active: false,
                lat: 51.332767,
                lng: 12.403157,
                zoom: 15,
                label: 'Leipzig - Ost'
            },
            {
                id: 'south',
                active: false,
                lat: 51.307803,
                lng: 12.375401,
                zoom: 15,
                label: 'Leipzig - Süd'
            },
            {
                id: 'west',
                active: false,
                lat: 51.337170,
                lng: 12.339277,
                zoom: 15,
                label: 'Leipzig - West'
            }
        ]
    },
    search: {
        active: false,
        filter: 'title',
        value: ''
    },
    category: {
        filter: [],
        id: 'category',
        label: 'Kategorie',
        aria: 'Hier können Sie Gebäude über Filter auswählen.' +
            ' Aktueller Filter, Gebäude aus den folgenden Kategorien anzeigen',
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
                filter: 'category',
                value: 'Bildung',
                label: 'Bildung',
                aria: 'Aria Label...'
            },
            {
                id: 'gesundheit',
                active: false,
                filter: 'category',
                value: 'Gesundheit',
                label: 'Gesundheit',
                aria: 'Aria Label...'
            },
            {
                id: 'recht',
                active: false,
                filter: 'category',
                value: 'Recht',
                label: 'Recht',
                aria: 'Aria Label...'
            },
            {
                id: 'verbaende',
                active: false,
                filter: 'category',
                value: 'Verbände',
                label: 'Verbände',
                aria: 'Aria Label...'
            },
            {
                id: 'verkehr',
                active: false,
                filter: 'category',
                value: 'Verkehr',
                label: 'Verkehr',
                aria: 'Aria Label...'
            }
        ]
    },
    entrance: {
        filter: [],
        id: 'entrance',
        label: 'Eingang',
        aria: 'Aktueller Filter, Anforderungen an den Eingangsbereich',
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'keine Einschränkung',
            },
            {
                id: 'entrance-partly-suit-f-wheelchair',
                active: false,
                filter: 'entrance-suit-f-wheelchair',
                value: 1,
                label: 'Eingang ist mindestens teilweise rollstuhlgerecht',
            },
            {
                id: 'entrance-suit-f-wheelchair',
                active: false,
                filter: 'entrance-suit-f-wheelchair',
                value: 2,
                label: 'Eingang ist rollstuhlgerecht',
            },
        ]
    },
    elevator: {
        filter: [],
        id: 'elevator',
        label: 'Aufzug',
        aria: 'Aktueller Filter, Anforderungen an den Aufzug',
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'keine Einschränkung',
            },
            {
                id: 'lift-avail',
                active: false,
                filter: 'lift-avail',
                value: 1,
                label: 'Aufzug ist vorhanden',
            },
            {
                id: 'lift-suit-f-wheelchair',
                active: false,
                filter: 'lift-suit-f-wheelchair',
                value: 1,
                label: 'Aufzug ist rollstuhlgerecht',
            }
        ]
    },
    toilet: {
        filter: [],
        id: 'toilet',
        label: 'Toilette',
        aria: 'Aktueller Filter, Anforderungen an die Toilette',
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'keine Einschränkung',
            },
            {
                id: 'toilet-avail',
                active: false,
                filter: 'toilet-avail',
                value: 1,
                label: 'Toilette ist vorhanden',
            },
            {
                id: 'toilet-suit-f-wheelchair',
                active: false,
                filter: 'toilet-suit-f-wheelchair',
                value: 1,
                label: 'Toilette ist rollstuhlgerecht',
            }
        ]
    },
    parking: {
        filter: [],
        id: 'parking',
        label: 'Parkplatz',
        aria: 'Aktueller Filter, Anforderungen an den Parkplatz',
        value: [
            {
                id: 'all',
                active: true,
                filter: undefined,
                value: null,
                label: 'keine Einschränkung',
            },
            {
                id: 'parking-avail',
                active: false,
                filter: 'parking-avail',
                value: 1,
                label: 'Parkplatz ist vorhanden',
            },
            {
                id: 'parking-f-disabled-avail',
                active: false,
                filter: 'parking-f-disabled-avail',
                value: 1,
                label: 'Parkplatz ist behindertengerecht',
            }
        ]
    },
    generalHelp: {
        active: false,
        filter: 'general-help',
        value: 1,
        label: 'Allgemeine Hilfestellung'
    },
    hearingHelp: {
        active: false,
        filter: 'help-for-hearing-imp',
        value: 1,
        label: 'Hilfestellung für Hörgeschädigte'
    },
    blindHelp: {
        active: false,
        filter: 'help-for-blind',
        value: 1,
        label: 'Hilfestellung für Sehgeschädigte'
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
