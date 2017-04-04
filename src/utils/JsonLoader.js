import Promise from 'promise-polyfill';
import 'whatwg-fetch';

class JsonLoader {
    constructor() {
        this.dataDir = './data/';
    }

    /**
     * @param String file Filename relative to this.dataDir
     * @return Promise with file content as JSON, or reject on error
     */
    loadJson(file) {
        return new Promise(
            (resolve, reject) => {
                fetch(this.dataDir + file, {})
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                }).then((json) => {
                    resolve(json);
                }).catch((ex) => {
                    reject(ex);
                });
            }
        );
    }
}

export default JsonLoader;
