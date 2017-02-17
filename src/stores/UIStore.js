class UIStore {
    constructor(logger) {
        this.logger = logger;

        this.config = {
            showWelcome: true,
            isSmallView: false,
            sidebarRoute: 'search'
        };
    }

    update(key, value) {
        this.config[key] = value;
    }

    get(key) {
        return this.config[key];
    }
}

export default UIStore;
