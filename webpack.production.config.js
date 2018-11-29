var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/main.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    library: 'BuildingNavigator',
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'main.min.js',
    libraryTarget: 'var'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 8080
  }
};

