import Cookies from 'js-cookie';

class UIStore {
    constructor(logger) {
        this.logger = logger;

        this.config = {
            // preselected and global disability: blind|hear|move
            globalDisability: undefined,
            // show or hide welcome message, if cookie showWelcome doe not exist, its true
            showWelcome: Cookies.get('showWelcome') !== 'false',
            // route (component) of the sidebar
            sidebarRoute: 'search',
            // results start index
            resultsStart: 0,
            // results max limit
            resultsLimit: 10,
        };
    }

    /**
     * Updates a config value by its key with the given value.
     *
     * @param {String} Config key
     * @param {Mixed} New value
     */
    update(key, value) {
        this.config[key] = value;
    }

    /**
     * Get config-value by given key
     *
     * @param {String} Config key
     * @return {Mixed} Value
     */
    get(key) {
        return this.config[key];
    }
}

export default UIStore;
