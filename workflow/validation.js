/*
 * Workflow - validation.js
 * Gulp tasks to handle code validation
 *
 * Copyright(c) 2015 BAESystems AI Creative
 * Licensed under the MIT license.
 */

'use strict';

/* VARIABLE DECLARATIONS */
var gulp = require('gulp');
var map = require('map-stream');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

var htmlhint_inline = require('gulp-htmlhint-inline');

gulp.task('validation', $.sequence(['lint:html','lint:bootstrap', 'jshint:scripts']));

gulp.task('lint:bootstrap', () =>  {
  console.log('Validating BOOTSTRAP');
  return gulp.src(config.deployDir + '/**/*.html')
    .pipe($.bootlint({
      stoponerror: false,
      stoponwarning: false,
      loglevel: 'info',
      disabledIds: ['W009', 'E007']
    }));
});

//html:partials - validates the partial html files. 
gulp.task('lint:html', () => {
  console.log('Validating HTML');
  var options = {
    htmlhintrc: '.htmlhintrc',
    ignores: {}
  };

  return gulp.src('../' + config.sourceDir + '_site/*.html')
    .pipe(htmlhint_inline({
      'doctype-first': false,
      'htmlhint': false
    }))
    .pipe(htmlhint_inline.reporter())
    .pipe($.using())
    .pipe(htmlhint_inline.reporter(htmlReporter));

});

//scripts - validates the javascript scripts
gulp.task('jshint:scripts', () =>  {
    console.log('Validating SCRIPTS');
  return gulp.src(['!'+ config.sourceDir + 'assets/js/vendor/*', './assets/js/_src/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.using())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(exitOnJshintError);
});

/* FUNCTIONS */
var htmlReporter = function(file) {
  if (!file.htmlhint_inline.success) {
    console.log('HTML VALIDATION reporter: htmlhint-inline fail in ' + file.path);
  }
}

var exitOnJshintError = map((file, cb) =>  {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});
