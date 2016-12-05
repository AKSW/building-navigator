/*eslint-disable no-console */
/*eslint no-unused-vars: 0*/

import 'whatwg-fetch';

const remoteUrl = () => {
    return 'http://localhost:8890/sparql';
};

export const request = (query) => {
    const fd = new FormData();
    fd.append('query', query);
    fd.append('format', 'application/json');

    return new Promise(
        function(resolve, reject) {
            fetch(remoteUrl(), {
                method: 'POST',
                body: fd
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                resolve(json.results.bindings);
            }).catch(function(ex) {
                reject(ex);
            });
        }
    );
};
