
var config = {
    production: {
        local_cache: {
            enabled: true
        },
        store: {
            host: 'https://opendata.leipzig.de',
            port: 443,
            path: '/virt-sparql/'
        },
    },
    development: {
        local_cache: {
            enabled: false
        },
        store: {
            host: 'http://localhost',
            port: 8890,
            path: '/sparql/'
        },
    },
    test: {
        local_cache: {
            enabled: false
        },
        store: {
            host: 'http://db',
            port: 8890,
            path: '/sparql/'
        },
    }
};

module.exports = config;