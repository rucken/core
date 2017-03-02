var gulp = require('gulp');
var typescript = require('gulp-tsc');
var clean = require('gulp-clean');
var inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('clean-src-inline', function () {
  return gulp.src('./src-inline', {read: false})
    .pipe(clean());
});

gulp.task('urls-to-inlines', ['clean-src-inline'], function() {
  var result = gulp.src(['./src/**/*.ts', './src/**/*.json'])
    .pipe(inlineNg2Template({ useRelativePaths: true }))
    .pipe(gulp.dest('src-inline/'))
});

gulp.task('default', ['urls-to-inlines']);