/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import RDFStore from 'rdfstore';
import {RDFfile, RDFfileFrmat, baseUri} from '../Constants';

let rdfstoreConn = null;

const setupRDFStore = () => {
    return new Promise(
        function(resolve, reject) {
            RDFStore.create((err, store) => {
                if (err) {
                    reject(err);
                }
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

/*
getGraph() {
        if (this.store === null) {
            throw new Error('Store is null');
        }
        return this.store.graph('http://example.org/', (err1, graph) => {
            if (err1) { throw err1; }
            this.graph = graph;
            //const peopleGraph = graph.filter(store.rdf.filters.type(store.rdf.resolve('foaf:Person')));
            return this.graph;
        });
    }
*/

/*
placeName: {
    var: '?name',
    label: 'Name',
    ...
}
*/

const getQuery = (state) => {
    const prefixes = `
PREFIX lePlace:<http://le-online.de/place/>
PREFIX leNs:<http://le-online.de/ontology/place/ns#>
`;
    const andFilterArr = [];
    const orFilterArr = [];
    const searchFilterArr = [];
    const qVarsArr = [
        {s: '?uri', p: 'leNs:placeName', o: '?name'},
        {s: '?uri', p: 'leNs:address', o: '?address'},
        {s: '?uri', p: 'leNs:lift-available', o: '?liftAvailable'},
        {s: '?uri', p: 'leNs:lift-liftWithWheelChairSupportAvailable', o: '?liftWithWheelChairSupportAvailable'},
        {s: '?uri', p: 'leNs:parkingLot-lotsForDisabledPeopleAvailable', o: '?parkingLotsForDisabledPeopleAvailable'},
        {s: '?uri', p: 'leNs:toilets-toiletForDisabledPeopleAvailable', o: '?toiletForDisabledPeopleAvailable'},
        {s: '?uri', p: 'leNs:lat', o: '?lat'},
        {s: '?uri', p: 'leNs:lng', o: '?lng'},
        {s: '?uri', p: 'leNs:note', o: '?note'},
        {s: '?uri', p: 'leNs:category', o: '?category'},
    ];

    const qVarsStr = qVarsArr.map((q) => {
        return `${q.s} ${q.p} ${q.o} .`;
    }).join('\n');

    Object.keys(state.filter).forEach((key) => {
        if (state.filter[key].active === true) {
            if (state.filter[key].type === 'checkbox') {
                andFilterArr.push(`regex(?${key}, "${state.filter[key].value}")`);
            }
            if (state.filter[key].type === 'select') {
                Object.keys(state.filter[key].value).forEach((selKey) => {
                    andFilterArr.push(`regex(?${key}, "${state.filter[key].value[selKey]}")`);
                });
            }
        }
    });

    if (state.filter.search.value !== '') {
        andFilterArr.push(`regex(?name, ".*${state.filter.search.value}.*", "i")`);
    }

    let filter = ``;
    filter += orFilterArr.length > 0 ? `(${orFilterArr.join(' || ')})` : '';
    if (orFilterArr.length > 0 && andFilterArr.length > 0) {
        filter += ` && `;
    }
    filter += andFilterArr.length > 0 ? `(${andFilterArr.join(' && ')})` : '';
    filter = filter !== '' ? `FILTER(${filter})` : '';

    const query = `${prefixes}
SELECT * FROM NAMED <${baseUri}> WHERE {
    GRAPH ?g {
        ${qVarsStr}
    }
    ${filter}
} LIMIT 10
`;
    return query;
};

const getPlaces = (query) => {
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
    case 'REQUEST_STORE':
        next({type: requestType});
        return setupRDFStore().then(
            response => {
                rdfstoreConn = response;
                next({type: successType});
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error);
                throw new Error(error);
            }
        );
    case 'REQUEST_PLACES':
        //const startTime = new Date().getTime();
        const query = getQuery(store.getState());
        next({type: requestType, payload: query});
        return getPlaces(query).then(
            response => {
                //const endTime = new Date().getTime();
                //console.log(`REQUEST_PLACE needed: ${(endTime - startTime)} Miliseconds`);
                const data = {type: successType, payload: response};
                next(data);
            },
            error => {
                next({type: failureType, payload: error.toString()});
                console.error(error);
                throw new Error(error);
            }
        );
    default:
        return next(action);
    }
};
