import Promise from 'promise-polyfill';
import rdfstore from 'rdfstore';

var env = process.env.NODE_ENV || 'production';
var config = require('../config')[env];

import buildingsIndex from '../100-buildings-index';
import buildings from '../100-buildings.js';

/**
 * Sparql Request to triple store
 */
class HttpRequest {
    constructor() {
        this.store = null;
    }

    /**
     * Do HTTP sparql request to our triple store
     * @param String query
     * @return Promise with result or throw error
     */
    request(query) {
        const self = this;

        if (this.store === null) {
            return new Promise((resolve, reject) => {
                rdfstore.create((err, store) => {
                    if (err) {
                        throw new Error(err);
                    }
                    self.store = store;

                    self.store.load('text/turtle', buildings, 'https://opendata.leipzig.de/bvlplaces/', (errLoad, result) => {
                        if (errLoad) {
                            reject(errLoad);
                        } else {
                            self.execute(query)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            })
                        }
                    });
                });
            });
        } else {
            return this.execute(query);
        }
    }

    /**
     * Get data from rdfstore
     */
    execute(query) {
        const self = this;
        if (this.store === null) {
            return new Promise((resolve, reject) => {
                reject("Store is null");
            });
        }

        return new Promise((resolve, reject) => {
            if (query.search(/SELECT \?id \?category \?title \?latitude \?longitude/) >= 0) {
                resolve({ data: buildingsIndex });
            } else {
                self.store.execute(query, function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ data: { results: { bindings: result } } });
                    }
                });
            }
        });
    }
}
export default HttpRequest;