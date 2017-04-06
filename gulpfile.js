var gulp = require('gulp');
var replace = require('gulp-replace');
var typescript = require('gulp-tsc');
var clean = require('gulp-clean');
var inlineNg2Template = require('gulp-inline-ng2-template');
var package = require('./package.json');
var angularCli = require('./.angular-cli.json');

gulp.task('add-version', function () {
    return gulp.src(angularCli.apps[0].outDir + '/index.html')
        .pipe(replace('<%VERSION%>', package.version))
        .pipe(gulp.dest(angularCli.apps[0].outDir));
});

gulp.task('clean-src-inline', function () {
  return gulp.src('./src-inline', {read: false})
    .pipe(clean());
});

gulp.task('urls-to-inlines', ['clean-src-inline'], function() {
  var result = gulp.src(['./src/**/*.ts', './src/**/*.json'])
    .pipe(inlineNg2Template({ useRelativePaths: true }))
    .pipe(gulp.dest('./src-inline/'))
});

gulp.task('clean-src-inline-demo', function () {
  return gulp.src('./demo/src-inline', {read: false})
    .pipe(clean());
});

gulp.task('urls-to-inlines-demo', ['clean-src-inline-demo'], function() {
  var result = gulp.src(['./demo/src/**/*.ts', './demo/src/**/*.json'])
    .pipe(inlineNg2Template({ useRelativePaths: true }))
    .pipe(gulp.dest('./demo/src-inline/'))
});

gulp.task('inline-templates-demo', ['urls-to-inlines-demo']);
gulp.task('inline-templates', ['urls-to-inlines']);
