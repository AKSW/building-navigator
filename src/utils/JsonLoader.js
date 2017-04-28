import Promise from 'promise-polyfill';
import 'whatwg-fetch';

/**
 * Load a JSON file from /dist/data/ and resolve as promise
 */
class JsonLoader {
    constructor() {
        this.dataDir = './data/';
    }

    /**
     * @param String file Filename relative to this.dataDir
     * @return Promise with file content as JSON, or reject on error
     */
    loadJson(file) {
        return new Promise((resolve, reject) => {
            // call whatwg fetch with files path
            // resolve JSON data if file was found in JSON could parsed
            // otherwise reject an error
            fetch(this.dataDir + file, {}).then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((ex) => {
                if (ex.toString() == 'Error: Not Found') {
                    reject(`Datei ${this.dataDir + file} nicht gefunden (${ex})`);
                }
                reject(ex);
            });
        });
    }
}

export default JsonLoader;
