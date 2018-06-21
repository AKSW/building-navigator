import Promise from 'promise-polyfill';
import axios from 'axios';
import qs from 'qs';

var env = process.env.NODE_ENV || 'production';
var config = require('../config')[env];

/**
 * Sparql Request to triple store
 */
class HttpRequest {
    constructor() {
    }

    /**
     * Do HTTP sparql request to our triple store
     * @param String query
     * @return Promise with result or throw error
     */
    request(query) {
        const url = `${config.store.host}:${config.store.port}${config.store.path}`;

        return axios({
            method: 'POST',
            url: url,
            data: qs.stringify({query}),
            headers: {
                Accept: "application/sparql-results+json"
            }
        })
        .catch(function (error) {
            throw new Error(error);
        });
    }
}
export default HttpRequest;
