import Promise from 'promise-polyfill';
import axios from 'axios';
import qs from 'qs';
import rdfstore from 'rdfstore';

var env = process.env.NODE_ENV || 'production';
var config = require('../config')[env];

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
                    self.store = store;
                    self.execute(query)
                    .then(result => {
                        resolve(result);
                    })
                    .catch(error => {
                        throw new Error(error);
                    })
                });
            });
        } else {
            return this.execute(query);
        }
    }


    execute(query) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
}
export default HttpRequest;
