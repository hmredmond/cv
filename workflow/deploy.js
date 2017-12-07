/*
 * Workflow - deploy.js
 * Gulp file to prepare the JS files for deploy state
 * 
 * Minimise
 * remove comments
 *
 * Copyright (c) 2017 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
  });

var jsFiles = 'assets/js/*utilities.js',
  jsDest = 'assets/js';

gulp.task('uglify', function() {
    return gulp.src(jsFiles)
        .pipe($.uglify())
        .pipe(gulp.dest(jsDest));
});