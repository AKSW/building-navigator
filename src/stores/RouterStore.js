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
        // each route should be an object with the folliwing proerties:
        //  stores: null, path: '...', component: '...', title: '...'
        //  while   stores is the current state for the stores
        //          path is a unique path-string for browsers locatiuon
        //          component is the component in /src/components
        //          title is the tutle for the browser
        // mainly it should created a route for 'index' and '404'
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

    /**
     * Get current the route (from browsers location)
     * If route is undefined, returns  404 route
     *
     * @return {Object} Route object
     */
    getCurrentRoute() {
        const route = this.getRoute(null);

        if (route === undefined) {
            return this.get404Route();
        }
        return route;
    }

    /**
     * Get the index route
     *
     * @return {Object} Route object
     */
    getIndexRoute() {
        return this.getRoute('index');
    }

    /**
     * Get the route for 404
     *
     * @return {Object} Route object
     */
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
