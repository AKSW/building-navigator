var path = require('path');
var webpack = require('webpack');

const PATHS = {
  dist: path.join(__dirname, 'dist')
};

module.exports = {
    devtool: 'inline-source-map',
    debug: true,
    context: path.resolve(__dirname),
    entry: './src/main.js',
    output: {
        path: PATHS.dist,
        filename: 'main.min.js',
    },
    resolve: {
        root: path.resolve(__dirname),
    },
    node: {
        fs: 'empty'
    },
    externals: {
        sqlite3: 'sqlite3'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ],
        loaders: [
         {
           test: /.jsx?$/,
           loader: 'babel-loader',
           exclude: /node_modules/,
           query: {
             presets: ['es2015', 'react']
           }
         }
       ]
    }
};
