/*eslint-disable no-console */

export const filterSettings = {
    'search': {
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
    'elevatorCabineIsAvailable': {
        active: false,
        value: 'ja',
        filter: '?elevatorCabineIsAvailable = "%s"'
    },
    'elevatorIsWheelchairAccessible': {
        active: false,
        value: 'ja',
        filter: '?elevatorIsWheelchairAccessible = "%s"'
    },
    'toiletIsAvailable': {
        active: false,
        value: '',
        filter: ''
    },
    'toiletIsWheelchairAccessible': {
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
