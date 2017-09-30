var po2json = require('po2json'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  recursive = require('recursive-readdir');
var folder = path.resolve(__srcdir, '../../', po.input.dir);
var package = require(path.resolve(__srcdir, '../../', po.input.dir, '../', 'package.json'));
console.log('Scan folder: ' + folder);
console.log('Module name: ' + package.name);
recursive(folder, ['!*.po'], function (err, files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var fileName = _.kebabCase(path.basename(file, '.po'));
    fs.readFile(file, function (err, buffer) {
      var jsonData = po2json.parse(buffer);
      for (var key in jsonData) {
        var value = jsonData[key];
        if (Array.isArray(value) && value.length === 2 && value[0] === null) {
          jsonData[key] = value[1];
        }
      }
      var moduleName = _.upperFirst(_.camelCase(package.name));
      var langName = _.upperFirst(_.camelCase(fileName));
      var out = 'export const ' + moduleName + langName + 'I18n = ' +
        JSON.stringify(jsonData, null, 4)
          .replace(new RegExp('\\\\\"', 'g'), 'QQQQQQ2')
          .replace(new RegExp('\\\\\'', 'g'), 'QQQQQQ1')
          .replace(new RegExp('\'', 'g'), 'QQQQQQ1')
          .replace(new RegExp('\"', 'g'), '\'')
          .replace(new RegExp('QQQQQQ2', 'g'), '\\\"')
          .replace(new RegExp('QQQQQQ1', 'g'), '\\\'')
        + ';\n';
      var outPath = path.resolve(__destdir, ts.output.dir, fileName + '.i18n.ts');
      fs.writeFileSync(outPath, out);
      console.log('Created: ' + outPath);
    });
  }
});
