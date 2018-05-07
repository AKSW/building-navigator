
var config = {
    development: {
        local_cache: {
            enabled: true
        },
        store: {
            host: 'http://localhost',
            port: 8890,
            path: '/sparql/'
        },
    },
    production: {
        local_cache: {
            enabled: true
        },
        store: {
            host: 'http://localhost',
            port: 8890,
            path: '/sparql/'
        },
    }
};

module.exports = config;