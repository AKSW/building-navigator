/*eslint-disable no-console */

export const addPlaces = (places) => {
    return {
        type: 'ADD_PLACES',
        payload: places
    };
};

/*export const changedMapView = () => {
    console.log('Changed Map view action...');
    return {
        type: 'ANYTHING'
    };
};*/

/*export const getPlace = (id) => {
    return {
        type: 'GET_PLACE',
        payload: id
    };
};*/
