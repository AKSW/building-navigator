import Promise from 'promise-polyfill';
import axios from 'axios';

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
        const bodyFormData = new FormData();
        bodyFormData.set('format', 'application/json');
        bodyFormData.set('query', query);

        return axios({
            method: 'POST',
            url: `${config.store.host}:${config.store.port}${config.store.path}`,
            data: bodyFormData,
        })
        .catch(function (error) {
            throw new Error(error);
        });
    }
}
export default HttpRequest;
