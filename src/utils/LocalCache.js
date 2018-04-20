/**
 *
 */
class LocalCache {
    constructor() {
        // max age of data in seconds, eg. 1 week
        this.maxAge = 60 * 60 * 24 * 7;
        // appendix for time
        this.timeAppendix = "-createdAt";
    }

    /**
     * Save a value by its key and the current time
     * @param {String} key
     * @param {*} value
     */
    set(key, value) {
        const now = Date.now();
        localStorage.setItem(key, JSON.stringify(value));
        localStorage.setItem(key + this.timeAppendix, now);
    }

    /**
     * Get a value from cache. If key not exists or is older then maxAge return null
     * @param {String} key
     * @return {Object|null}
     */
    get(key) {
        const value = localStorage.getItem(key);
        const valTime = localStorage.getItem(key + this.timeAppendix);
        if (value === null || valTime === null) {
            return null;
        }
        const now = Date.now();
        if (now > (parseInt(valTime) + (this.maxAge*1000))) {
            return null;
        }
        return JSON.parse(value);
    }
}

export default LocalCache;
