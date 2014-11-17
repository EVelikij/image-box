var gulp = require('gulp');
var browserify = require('gulp-browserify');
var refresh = require('gulp-livereload');
var less = require('gulp-less');
var path = require('path');

gulp.task('browserify', function() {
  gulp.src('public/javascripts/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
      shim: {
        angular: {
            path: 'node_modules/angular/angular.js',
            exports: 'angular'
        }
      }
    }))
    .pipe(gulp.dest('dest/js'));
});

gulp.task('less', function() {
  gulp.src('./public/stylesheets/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dest/stylesheets'))
})

gulp.task('static', function() {
  gulp.src('public/partials/**/*.html')
    .pipe(gulp.dest('dest/partials'));
    
  gulp.src('public/stylesheets/**/*.css')
    .pipe(gulp.dest('dest/stylesheets'));
})

gulp.task('express', function() {
  var express = require('express');
  var app = require('./app');

  app.listen(3000);
  refresh.listen(35729);
});

gulp.task('watch', function() {
  // watch changes on frontend scripts
  gulp.watch('./public/javascripts/**/*.js', ['browserify']);

  gulp.watch('./public/partials/**/*.html', ['static']);
  gulp.watch('./public/stylesheets/**/*.css', ['static']);
  gulp.watch('./public/stylesheets/**/*.less', ['less']);
  
  gulp.watch('./dest/**', refresh.changed);
})

gulp.task('default', ['express', 'watch', 'browserify', 'static']);