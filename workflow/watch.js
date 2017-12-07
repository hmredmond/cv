/*
 * Workflow - watch.js
 * Gulp file to organise general watch tasks
 *
 * Copyright (c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch("assets/js/_src/*.js", ['babel']);
	gulp.watch(config.sassDir + '/**/*.scss', ['styles', 'minify-css']);
});
