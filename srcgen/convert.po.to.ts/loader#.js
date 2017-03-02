var po2json = require('po2json'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  recursive = require('recursive-readdir');

recursive(path.resolve(__srcdir, '../../', po.input.dir), ['!*.po'], function (err, files) {
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
      var moduleName = _.upperFirst(path.basename(path.dirname(path.dirname(file))));
      if (moduleName == 'Src') {
        moduleName = _.upperFirst(path.basename(path.dirname(path.dirname(path.dirname(file)))));
      }
      var langName = _.upperFirst(_.camelCase(fileName));
      var out = 'export const ' + moduleName + langName + 'I18n = ' + JSON.stringify(jsonData, null, 4) + ';';
      var outPath = path.resolve(__destdir, ts.output.dir, fileName + '.i18n.ts');
      fs.writeFileSync(outPath, out);
      console.log('Created: ' + outPath);
    });
  }
});
