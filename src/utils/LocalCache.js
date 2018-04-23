/**
 *
 */
class LocalCache {
    constructor() {
        // version, to verify cached data
        // decreese if cached data changed
        this.version = 1;
        // max age of data in seconds, eg. 1 week
        this.maxAge = 60 * 60 * 24 * 7;
    }

    /**
     * Save a value by its key and the current time
     * @param {String} key
     * @param {*} value
     * @returns Void
     */
    set(key, value) {
        const now = Date.now();
        const obj = {
            version: this.version,
            data: value,
            time: now
        }
        localStorage.setItem(key, JSON.stringify(obj));
    }

    /**
     * Get a value from cache.
     * Returns null if key not exists, is older then maxAge or version does not match
     * @param {String} key
     * @return {Object|null}
     */
    get(key) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        // may json parse fails...
        let obj;
        try {
            obj = JSON.parse(value);
        }
        catch(err) {
            return null;
        }
        // test if obj is valid
        if (!obj.hasOwnProperty("version") ||
            !obj.hasOwnProperty("data") ||
            !obj.hasOwnProperty("time")
        ) {
            this.remove(key);
            return null;
        }
        // test if cached data-version is current and data is not too old (mayAge)
        const now = Date.now();
        if (obj.version != this.version ||
            now > (parseInt(obj.time) + (this.maxAge*1000))
        ) {
            this.remove(key);
            return null;
        }
        return obj.data;
    }

    /**
     * Remove data from cache
     * @param {String} key
     */
    remove(key) {
        localStorage.removeItem(key);
    }
}

export default LocalCache;
