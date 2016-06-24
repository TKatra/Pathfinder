'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
// var browserSync = require('browser-sync').create();

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'server.js'
//     }
//   });
// });

gulp.task('sass', function() {
  return gulp.src('./public/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    // .pipe(browserSync.reload({
    //   stream: true
    // }))
});

gulp.task('index-load', function() {
  var target = gulp.src('./public/index.html');
  var libSources = gulp.src(['./libs/**/*.min.js'], {
    read: false,
    cwd: __dirname + '/public'
  });
  var prioSources = gulp.src(['./config/**/*.js'], {
    read: false,
    cwd: __dirname + '/public'
  });
  var sources = gulp.src(['./**/*.js', '!./config/**/*.js', '!./libs/**/*.js'], {
    read: false,
    cwd: __dirname + '/public'
  });

  return target.pipe(inject(libSources, {addRootSlash: false, name:'libs'}))
    .pipe(inject(prioSources, {addRootSlash: false, name:'prio'}))
    .pipe(inject(sources, {addRootSlash: false}))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', ['index-load', 'sass'], function() {
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});