/*eslint-disable no-console */

const places = (state = [], action) => {
    switch (action.type) {
    case 'ADD_PLACES':
        return [
            ...state,
            ...action.payload
        ];
    /*case 'ADD_PLACE':
        return [
            ...state,
            {
                id: action.payload.id,
                name: action.payload.name,
                popoverText: action.payload.popoverText
            }
        ];*/
    default:
        return state;
    }
};

export default places;
