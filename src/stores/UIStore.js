import Cookies from 'js-cookie';

/**
 * Store for all general interface settings which do not belongs to the other stores
 */
class UIStore {
    constructor(logger) {
        this.logger = logger;

        this.config = {
            // given config from user
            userConfig: null,
            // max pixel for the mobile view
            smallViewMax: 768,
            // flag if browser screen is smal (e.g. mobile devices)
            isSmallView: false,
            // preselected and global disability: blind|hear|move
            globalDisability: undefined,
            // show or hide welcome message, if cookie showWelcome doe not exist, its true
            showWelcome: Cookies.get('showWelcome') !== 'false',
            // sidebar is visible flag
            sidebarIsVisible: true,
            // results start index
            resultsStart: 0,
            // steps for results
            resultsSteps: 20,
            // map bounds decreasing factor in (negative!) percent, avoids buildings too close to the border
            mapPadding: -0.1,
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
