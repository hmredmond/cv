/*
 * Workflow - sass.js
 * Gulp tasks to compile sass code to css
 *
 * Copyright (c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */


'use strict';

var gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var sassGlob = require('gulp-sass-glob');
var sassNpm = require('sass-npm');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

//styles - compiles styles from scss and includes 
//the json colours
gulp.task('styles', ['styles:sass'], function() {
  gulp.run('minify-css');

});

gulp.task('styles:sass', function() {

  return gulp.src([config.sassDir + '/*.scss'])
  //.pipe($.sourcemaps.init())  
  .pipe(sassGlob())    
    .pipe($.sass({
      style: 'expanded',
      importer: sassNpm.importer      
    }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    //.pipe($.sourcemaps.write())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(config.cssDir));
});


gulp.task('minify-css', () => {
  return gulp.src([config.cssDir + '/style.css',config.cssDir + '/bootstrap.css' ])
  .pipe($.using())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.cssDir))
    
});
  