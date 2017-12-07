/*
 * Workflow - accessibility.js
 * Gulp file to tet accessibility of the output html
 *
 * Copyright (c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var a11y = require('gulp-a11y');
var access = require('gulp-accessibility');
var rename = require("gulp-rename");

/* detailed accessibility check - output to reports folder in the workflow folder */
gulp.task('accessibility-audit', function() {
    return gulp.src('./_site/**/*.html')
      .pipe(access({
        force: true
      }))
      .on('error', console.log)
      .pipe(access.report({reportType: 'txt'}))
      .pipe(rename({
        extname: '.txt'
      }))
      .pipe(gulp.dest('./workflow/reports'));
  });

  /* less detailed accessibility check */
gulp.task('accessibility-audit-overview', function () {
 return gulp.src('./_site/**/*.html')
   .pipe(a11y())
   .pipe(a11y.reporter());
});