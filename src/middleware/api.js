/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import {getPlaces, placeDetails, getPlaceById} from './queries';
import {request} from './store';

export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action);
    }

    const {types, payload} = callApi;
    // @TODO test correct types
    const [requestType, successType, failureType] = types;

    switch (callApi.type) {
    case 'REQUEST_PLACES':
        //const startTime = new Date().getTime();
        //const query = requestPlacesQuery(store.getState().filter);
        const query = getPlaces(store.getState());
        /** @todo we dont need the query in state, only on error */
        next({type: requestType, payload: query});

        return request(query).then(
            response => {
                const data = {type: successType, payload: response};
                next(data);
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error, ' with query: ', query);
                throw new Error(error);
            }
        );

    case 'REQUEST_PLACE_BY_ID':
        const placeQuery = getPlaceById(callApi.payload);
        next({type: requestType, payload: placeQuery});

        return request(placeQuery).then(
            response => {
                if (response.length !== 1) {
                    const error = 'Response of request place should be an array of 1';
                    next({type: failureType, payload: error});
                    throw new Error(error);
                }
                const data = {type: successType, payload: {
                    id: callApi.payload,
                    place: response[0]
                }};
                next(data);
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error, ' with query: ', placeQuery);
                throw new Error(error);
            }
        );

    case 'REQUEST_PLACE_DETAILS':
        const placeDetailsQuery = placeDetails(callApi.payload);
        next({type: requestType, payload: placeDetailsQuery});

        return request(placeDetailsQuery).then(
            response => {
                if (response.length !== 1) {
                    const error = 'Response of request place details should be an array of 1';
                    next({type: failureType, payload: error});
                    throw new Error(error);
                }
                const data = {type: successType, payload: {
                    uri: callApi.payload,
                    data: response[0]
                }};
                next(data);
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error, ' with query: ', placeDetailsQuery);
                throw new Error(error);
            }
        );
        /*const placeDetailsQuery = requestPlaceDetailsQuery(callApi.payload);
        next({type: requestType, payload: placeDetailsQuery});
        return execStore(placeDetailsQuery).then(
            response => {
                if (response.length !== 1) {
                    const error = 'Response of request place details should be an array of 1';
                    next({type: failureType, payload: error});
                    throw new Error(error);
                }
                const data = {type: successType, payload: {
                    uri: callApi.payload,
                    data: response[0]
                }};
                next(data);
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error);
                throw new Error(error);
            }
        );*/
    default:
        return next(action);
    }
};
