
var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['webpack']);

gulp.task('webpack', function(callback) {
  var myConfig = Object.create(webpackConfig);

  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    callback();
  });
});
