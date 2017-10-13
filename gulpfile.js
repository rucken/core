var gulp = require('gulp');
var replace = require('gulp-replace');
var package = require('./package.json');
var angularCli = require('./.angular-cli.json');
var path = require('path');
var fs = require('fs');

gulp.task('web:change-version', function (done) {
  var srcPackage = require('./web/package.json');
  srcPackage.version = package.version;
  try {
    fileName = path.resolve('./web/package.json');
    fs.writeFileSync(fileName, JSON.stringify(srcPackage, null, 4));
  } catch (error) {
    console.error(error);
  }
  done();
});

gulp.task('core:change-version', function (done) {
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

gulp.task('app:add-version', function () {
  return gulp.src(angularCli.apps[0].outDir + '/index.html')
    .pipe(replace('<%VERSION%>', package.version))
    .pipe(gulp.dest(angularCli.apps[0].outDir));
});
