var gulp = require('gulp');
var replace = require('gulp-replace');
var typescript = require('gulp-tsc');
var clean = require('gulp-clean');
var package = require('./package.json');
var angularCli = require('./.angular-cli.json');
var path = require('path');
var fs = require('fs');

gulp.task('change-src-version', function (done) {
  var srcPackage = require('./src/package.json');
  srcPackage.version = package.version;
  try {
    fileName = path.resolve('./src/package.json');
    fs.writeFileSync(fileName, JSON.stringify(srcPackage, null, 4));
  } catch (error) {
    console.error(error);
  }
  done();
});

gulp.task('change-core-version', function (done) {
  var srcPackage = require('./core/package.json');
  srcPackage.version = package.version;
  try {
    fileName = path.resolve('./core/package.json');
    fs.writeFileSync(fileName, JSON.stringify(srcPackage, null, 4));
  } catch (error) {
    console.error(error);
  }
  done();
});

gulp.task('add-version', function () {
  return gulp.src(angularCli.apps[0].outDir + '/index.html')
    .pipe(replace('<%VERSION%>', package.version))
    .pipe(gulp.dest(angularCli.apps[0].outDir));
});
