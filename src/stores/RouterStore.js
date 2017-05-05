import _ from 'lodash';

/**
 * Store for routes and update the browser history
 * All available routes needs to created here.
 *
 * Usage:
 *  get current route: RouterStore.getCurrentRoute()
 */
class RouterStore {
    constructor(logger) {
        this.logger = logger;
        this.routes = [];

        // init basetitle
        this.basetitle = document.title;
        // title seperator
        this.seperator = '-';

        // init all default routes
        this.addRoutes([
            {stores: null, path: 'index', component: 'Search', title: 'Suche'},
            {stores: null, path: 'search', component: 'Search', title: 'Suche'},
            {stores: null, path: 'results', component: 'Results', title: 'Ergebnisse'},
            {stores: null, path: '404', component: 'NotFound', title: '404'},
        ]);
    }

    /**
     * Add a route to local routes
     *
     * @param {Object} Stores state of the application for the current route
     * @param {String} Unique path of the route
     * @param {String} Used component for the route
     * @param {String} Title for the route
     */
    addRoute(stores = null, path, component, title = '') {
        this.routes.push({stores, path, component, title});
    }

    /**
     * Add multiple routes
     *
     * @param {Array} Array of routes
     */
    addRoutes(routes) {
        routes.forEach((route, id) => {
            this.addRoute(route.stores, route.path, route.component, route.title);
        });
    }

    /**
     * Set current route in browser history
     *
     * @param {Object} Store state
     * @param {String} Route path
     */
    setCurrentRoute(currentStores, routePath) {
        // get route from path
        const route = this.getRoute(routePath);

        // write deep copy of current store state into previous route
        const prevRoute = this.getCurrentRoute();
        if (prevRoute !== undefined) {
            prevRoute.stores = _.cloneDeep(currentStores);
        }

        // create browser title
        if (route.title != '') {
            route.title = `${route.title} ${this.seperator} ${this.basetitle}`;
        }
        document.title = route.title;

        // add route to browsers history
        history.pushState(null, route.title, `${location.pathname}#/${route.path}`);
    }

    getCurrentRoute() {
        const route = this.getRoute(null);

        if (route === undefined) {
            return this.get404Route();
        }
        return route;
    }

    getIndexRoute() {
        return this.getRoute('index');
    }

    get404Route() {
        return this.getRoute('404');
    }

    /**
     * Get specific route. If path is null, get path from browser url hash
     *
     * @return {Object} Route object
     */
    getRoute(path = null) {
        if (path == null) {
            path = this.getPathFromLocation();
        }

        return this.routes.find((route) => {
            return route.path == path;
        });
    }

    /**
     * Get all routes
     *
     * @returns {Array} Array of routes
     */
    getRoutes() {
        return this.routes;
    }

    /**
     * Get current path from hash in location:
     * e.g. get index from following: #, #foo, #/, #/index, #foo/index, #foo/index/bar, #/index?param
     *
     * @return {String}
     */
    getPathFromLocation() {
        const hash = window.location.hash;
        const path = hash.match(/\#.*\/(\w*)(\?.*)*/);
        if (path !== null) {
            return path[1];
        }
        return 'index';
    }
}

export default RouterStore;
