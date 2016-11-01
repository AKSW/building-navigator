/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import RDFStore from 'rdfstore';
import {RDFfile, RDFfileFrmat, baseUri} from '../Constants';

let rdfstoreConn = null;

const setupRDFStore = () => {
    return new Promise(
        function(resolve, reject) {
            RDFStore.create((err, store) => {
                if (err) { reject(err); }
                store.load(RDFfileFrmat, RDFfile, baseUri,
                    (err0, triples) => {
                        if (err0) { reject(err0); }
                        resolve(store);
                    });
            });
        }
    );
};

const execRDFStore = (query) => {
    if (rdfstoreConn === null) {
        throw new Error('RDFStore is null');
    }
    return new Promise(
        function(resolve, reject) {
            rdfstoreConn.execute(query, function(err, result) {
                if (err) { reject(err); }
                resolve(result);
            });
        }
    );
};

const getPlaces = (state) => {
    let query = `
PREFIX lePlace:<http://le-online.de/place/>
PREFIX leNs:<http://le-online.de/ontology/place/ns#>
SELECT ?uri ?name ?lat ?lng
FROM NAMED <${baseUri}> { GRAPH ?g {
    `;

    const p1 = [
        {s: '?uri', p: 'leNs:placeName', o: '?name'},
        {s: '?uri', p: 'leNs:lat', o: '?lat'},
        {s: '?uri', p: 'leNs:lng', o: '?lng'}
    ];

    const f1 = [];
    Object.keys(state.filter).forEach((key) => {
        if (state.filter[key].active === true) {
            f1.push(
                {
                    s: '?uri',
                    p: `leNs:${key}`,
                    o: `"${state.filter[key].value}"^^<http://www.w3.org/2001/XMLSchema#string>`
                }
            );
        }
    });

    let qs = ``;
    p1.forEach((element, index) => {
        qs = `${qs}${element.s} ${element.p} ${element.o} .
        `;
    });
    f1.forEach((element, index) => {
        qs = `${qs}${element.s} ${element.p} ${element.o} .
        `;
    });

    query = `${query}
    ${qs}
} } LIMIT 10
    `;

    //console.log(query);
    //leNs:lift-available ?liftAvailable
    //FILTER regex(?liftAvailable, "yes")

    return new Promise(
        function(resolve, reject) {
            execRDFStore(query).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            );
        }
    );
};


/*const api = ({getState}) => {
    console.log('Init Store here?');
    return (next) => (action) => {
        console.log('will dispatch', action);

        //action.payload = action.payload + " - har";

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('state after dispatch', getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    };
};

export default api;
*/

export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action);
    }

    const {types, payload} = callApi;
    // @TODO test correct types
    const [requestType, successType, failureType] = types;

    // set request
    next({type: requestType});

    //console.log('will dispatch', callApi);

    switch (callApi.type) {
    case 'REQUEST_STORE':
        rdfstoreConn = 1;
        return setupRDFStore().then(
            response => {
                rdfstoreConn = response;
                next({type: successType});
            },
            error => console.error(error)
        );
    case 'REQUEST_PLACES':
        return getPlaces(store.getState()).then(
            response => {
                //console.log('PLACES:', response);
                const data = {type: successType, payload: response};
                next(data);
                //console.log('state after dispatch', store.getState());
            },
            error => {
                console.error(error);
            }
        );
    default:
        return next(action);
    }
};
