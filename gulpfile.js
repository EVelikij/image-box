var gulp = require('gulp');
var browserify = require('gulp-browserify');
var livereload = require('tiny-lr')();

function notifyLivereload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log('Reloading ' + fileName);
  livereload.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('scripts', function() {
  gulp.src('public/javascripts/app.js')
    .pipe(browserify({
      debug: true,
      shim: {
        angular: {
            path: 'node_modules/angular/angular.js',
            exports: 'angular'
        }
      }
    }))
    .pipe(gulp.dest('dest/js'));

  console.log('browserify complete')
});

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
});

gulp.task('livereload', function() {
  livereload.listen(35729);
})

gulp.task('watch', function() {
  var jsWatcher = gulp.watch('./public/javascripts/**/*.js', ['scripts']);

  jsWatcher.on('change', notifyLivereload);
})

gulp.task('default', ['express', 'livereload', 'watch', 'scripts', 'static']);