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
        publicPath: '/',
        filename: '/main.min.js',
    },
    resolve: {
        root: path.resolve(__dirname),
    },
    devServer: {
        historyApiFallback: true,
        index: '/dist/'
    },
    historyApiFallback: {
        index: '/dist/',
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
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ],
        loaders: [
         {
           test: /\.js?$/,
           loader: 'babel-loader',
           exclude: /node_modules/,
           query: {
             presets: ['es2015', 'react']
           }
         }
       ]
    }
};
