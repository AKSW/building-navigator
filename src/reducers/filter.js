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
        active: true,
        value: [
            {
                value: 'center',
                active: true,
                lat: 51.3412,
                lng: 12.3747,
                label: 'Leipzig - Zentrum'
            },
            {
                value: 'north',
                active: false,
                lat: 51.364498,
                lng: 12.367856,
                label: 'Leipzig - Nord'
            },
            {
                value: 'east',
                active: false,
                lat: 51.332767,
                lng: 12.403157,
                label: 'Leipzig - Ost'
            },
            {
                value: 'south',
                active: false,
                lat: 51.307803,
                lng: 12.375401,
                label: 'Leipzig - Süd'
            },
            {
                value: 'west',
                active: false,
                lat: 51.337170,
                lng: 12.339277,
                label: 'Leipzig - West'
            }
        ],
        filter: ''
    },
    search: {
        active: false,
        value: '',
        filter: 'regex(?title, ".*%s.*", "i")'
    },
    // 'accessibleLift' {
    //     filter: 'regex(?elevatorCabineIsAvailable, "ja") && \
    //         ?elevatorCabineWidth > "110" && \
    //         ?elevatorDoorWidth > "70"';
    // },
    /*'elevator': {
        active: false,
        value: {
            'elevatorCabineIsAvailable': {
                active: false,
                value: 'ja',
                filter: '?elevatorCabineIsAvailable = "%s"'
            },
            'elevatorIsWheelchairAccessible': {
                active: false,
                value: 'ja',
                filter: '?elevatorIsWheelchairAccessible = "%s"'
            }
        },
    },*/
    evlevatorAll: {
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
    /*'liftAvailable': {
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
    case 'SET_FILTER':
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

    default:
        return state;
    }
};

export default filter;
