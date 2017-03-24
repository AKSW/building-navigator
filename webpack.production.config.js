var path = require('path');
var webpack = require('webpack');

const PATHS = {
  dist: path.join(__dirname, 'dist')
};

module.exports = {
    devtool: 'cheap-module-source-map',
    context: path.resolve(__dirname),
    entry: './src/main.js',
    output: {
        library: 'BuildingNavigator',
        path: PATHS.dist,
        publicPath: '/',
        filename: 'main.min.js',
        libraryTarget: 'var'
    },
    resolve: {
        root: path.resolve(__dirname),
    },
    module: {
        loaders: [
         {
           test: /\.js?$/,
           loader: 'babel-loader',
           exclude: /node_modules/,
           query: {
             presets: ['es2015', 'react']
           }
         },
         {
            test: /\.css/,
            loader: 'style!css?modules',
            include: __dirname + '/src'
          }
       ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
      }),
    ],
};
