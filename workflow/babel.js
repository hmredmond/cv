/*
 * Workflow - babel.js
 * Gulp file to compile JS to browser compatible JS
 *
 * Copyright (c) 2017 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var babel = require("gulp-babel");

gulp.task("babel", function () {
  return gulp.src("assets/js/_src/*.js")
    .pipe(babel())
    .pipe(gulp.dest("assets/js"));
});