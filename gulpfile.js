var gulp = require('gulp');
var replace = require('gulp-replace');
var package = require('./package.json');
var angularCli = require('./.angular-cli.json');
var path = require('path');
var fs = require('fs');

gulp.task('lib-web:change-version', function (done) {
  var srcPackage = require('./libs/web/src/package.json');
  srcPackage.version = package.version;
  try {
    fileName = path.resolve('./libs/web/src/package.json');
    fs.writeFileSync(fileName, JSON.stringify(srcPackage, null, 4));
  } catch (error) {
    console.error(error);
  }
  done();
});

gulp.task('lib-core:change-version', function (done) {
  var srcPackage = require('./libs/core/src/package.json');
  srcPackage.version = package.version;
  try {
    fileName = path.resolve('./libs/core/src/package.json');
    fs.writeFileSync(fileName, JSON.stringify(srcPackage, null, 4));
  } catch (error) {
    console.error(error);
  }
  done();
});

gulp.task('app-demo:add-version', function () {
  return gulp.src(angularCli.apps[0].outDir + '/index.html')
    .pipe(replace('<%VERSION%>', package.version))
    .pipe(gulp.dest(angularCli.apps[0].outDir));
});
