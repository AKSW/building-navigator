/*eslint-disable no-console */

/*
 * Contains an adapter to connect rdfstore-js to our application.
 */

import RDFStore from 'rdfstore';

const db = require('raw!../assets/le-online-places-new.ttl');

class Store {
    constructor() {
        this.store = null;
        this.graph = null;
        console.log('TODO: rewrite Store.js');
    }

    init(callback) {
        //const testRdf = require('raw!../dist/data/le-online-places-new.ttl');
        //console.log(testRdf);
        RDFStore.create((err, store) => {
            if (err) { throw err; }
            this.store = store;
            //this.store.load('remote', 'http://localhost:8080/data/le-online-places-new.ttl', 'http://example.org/',
            this.store.load('text/turtle', db, 'http://example.org/',
                (err0, result) => {
                    if (err0) { throw err0; }
                    /*this.store.graph('http://example.org/', (err1, graph) => {
                        if (err1) { throw err1; }
                        this.graph = graph;
                        //const peopleGraph = graph.filter(store.rdf.filters.type(store.rdf.resolve('foaf:Person')));
                        callback(this.graph);
                    });*/
                    callback(result);
                });
        });
    }

    execute(query, callback) {
        /*if (this.store === null || this.graph === null) {
            throw new Error('Store or Graph is null');
        }*/
        if (this.store === null) {
            throw new Error('Store is null');
        }
        this.store.execute(query, function(err, result) {
            if (err) { throw err; }
            //return results;
            callback(result);
        });
    }

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
}

export default Store;
