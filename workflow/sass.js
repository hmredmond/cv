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
gulp.task('sass', ['sass:compile'], function() {
  gulp.run('minify-css');
});

gulp.task('sass:compile', () => {
  return gulp.src([config.sourceDir + config.sassDir + '*.scss'])
  .pipe(sassGlob())    
    .pipe($.sass({
      style: 'expanded',
      importer: sassNpm.importer      
    }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.using())
    .pipe($.autoprefixer())
    .pipe(gulp.dest('../' + config.sourceDir + config.cssDir));
});


gulp.task('minify-css', () => {
  return gulp.src([config.sourceDir + config.cssDir + '/style.css',config.sourceDir + config.cssDir + '/bootstrap.css' ])
  .pipe($.using())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe($.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('../' + config.sourceDir + config.cssDir))
});  