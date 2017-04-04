class RouterStore {
    constructor(logger) {
        this.logger = logger;
        this.routes = [];
        this.addRoutes([
            {path: 'Index', component: 'Search'},
            {path: 'search', component: 'Search'},
            {path: 'results', component: 'Results'}
        ]);

        this.setCurrentRoute('Index');
    }

    addRoute(route) {
        this.routes.push(route);
    }

    addRoutes(routes) {
        routes.forEach((route, id) => {
            this.addRoute(route);
        });
    }

    setCurrentRoute(path) {
        history.pushState(null, document.title, `${location.pathname}#/${path}`);
    }

    getCurrentRoute() {
        return this.getRoute(null);
    }

    getIndexRoute() {
        return this.getRoute('Index');
    }

    get404Route() {
        return this.getRoute('404');
    }

    getRoute(path = null) {
        if (path == null) {
            path = this.getPathFromLocation();
        }
        return this.routes.find((route) => {
            return route.path == path;
        });
    }

    getRoutes() {
        return this.routes;
    }

    /**
     * Get current path from hash in location:
     * e.g. get Index from following: #, #foo, #/, #/Index, #foo/Index, #foo/Index/bar, #/Index?param
     */
    getPathFromLocation() {
        const hash = window.location.hash;
        const path = hash.match(/\#.*\/(\w*)(\?.*)*/);
        if (path !== null) {
            return path[1];
        }
        return 'Index';
    }
}

export default RouterStore;
