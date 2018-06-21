module.exports = {
  devtool: 'eval',
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
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 8080
  }
};

