/*eslint-disable no-console */

const filterSettings = {
    'lift-liftWithWheelChairSupportAvailable': {
        active: true,
        value: 'yes'
    },
    'parkingLot-lotsForDisabledPeopleAvailable': {
        active: false,
        value: 'yes'
    },
    'toilets-toiletForDisabledPeopleAvailable': {
        active: false,
        value: 'yes'
    }
};

const filter = (state = filterSettings, action) => {
    switch (action.type) {
    case 'SET_FILTER':
        const filterObj = {};
        filterObj[action.key] = {
            active: action.payload,
            value: state[action.key].value
        };
        return Object.assign({}, state, filterObj);

    default:
        return state;
    }
};

export default filter;
