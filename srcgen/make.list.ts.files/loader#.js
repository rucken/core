var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  srcgen = require('srcgen'),
  recursive = require('recursive-readdir'),
  replaceExt = require('replace-ext');
var scanPath = path.resolve(__srcdir, '..', '..', scan.path);
var package = require(path.resolve(__srcdir, '..', '..', scan.path, 'package.json'));
console.log('Scan dir:' + scanPath);
console.log('Module name: ' + package.name);
recursive(scanPath, ['!*.ts', '*node_modules*'], function (err, files) {
  var exportArray = [];
  var exportEntities = {};
  var delmitters = [
    { prefix: 'class ', postfix: ' ' },
    { prefix: 'const ', postfix: ' ' },
    { prefix: 'enum ', postfix: ' ' },
    { prefix: 'interface ', postfix: ' ' },
    { prefix: 'export function ', postfix: '(', var: true }
  ];
  var entities = [
    'module',
    'component',
    'shared',
    'service',
    'pipe'
  ];
  var moduleName = _.upperFirst(_.camelCase(package.name));
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var content = srcgen.utils.load(file);
    content = content.replace(/  +/g, ' ').replace(new RegExp(':', 'g'), ' ');
    for (var d = 0; d < delmitters.length; d++) {
      var delmitter = delmitters[d];
      var items = srcgen.between.get(content, delmitter.prefix, delmitter.postfix);
      for (var j = 0; j < items.length; j++) {
        var className = items[j].trim();
        if (delmitter.var || _.camelCase(className).toLowerCase() === className.toLowerCase() && className.toLowerCase()[0] !== className[0]) {
          var classFile = replaceExt(
            file.replace(scanPath, '').replace(new RegExp('\\' + path.sep, 'g'), '/'),
            '').split(path.sep).join("/");
          var founded = false;
          for (var e = 0; e < entities.length; e++) {
            if (!exportEntities[entities[e]]) {
              exportEntities[entities[e]] = [];
            }
            if (classFile.replace('.' + entities[e], '') !== classFile && '/index' !== classFile) {
              founded = true;
              if (moduleName + _.upperFirst(entities[e] + 's') !== className) {
                if (entities[e] === 'component') {
                  var templateFile = path.resolve(scanPath, '.' + replaceExt(classFile, '.component.html'));
                  if (srcgen.utils.exists(templateFile)) {
                    exportEntities[entities[e]].push(className);
                  }
                } else {
                  if (className.indexOf('Shared') === -1) {
                    if (entities[e] !== 'module') {
                      exportEntities[entities[e]].push(className);
                    } else {
                      if (className.indexOf('AppModule') === -1 && className.indexOf('PageModule') === -1 && className.indexOf('FrameModule') === -1) {
                        exportEntities[entities[e]].push(className + '.forRoot()');
                      }
                    }
                  }
                }
              }
            }
          }
          if (!founded) {
            founded = false;
            for (var e = 0; e < entities.length; e++) {
              if (moduleName + _.upperFirst(entities[e] + 's') === className) {
                founded = true;
              }
            }
            if (!founded && delmitter.prefix !== 'interface ') {
              exportEntities['shared'].push(className);
            }
          }
          founded = false;
          for (var e = 0; e < entities.length; e++) {
            if (moduleName + _.upperFirst(entities[e] + 's') === className) {
              founded = true;
            }
          }
          if (!founded && '/index' !== classFile) {
            var importLine = 'import { ' + className + ' } from \'.' + classFile + '\';';
            exportArray.push(importLine);
            var exportLine = 'export { ' + className + ' } from \'.' + classFile + '\';';
            exportArray.push(exportLine);
          }
        }
      }
    }
  }
  for (var e = 0; e < entities.length; e++) {
    if (exportEntities[entities[e]]) {
      exportArray.push('export const ' + moduleName + _.upperFirst(entities[e] + 's') + ': any[] = [' + exportEntities[entities[e]].join(', ') + '];');
    }
  }
  if (exportArray.length > 0) {
    var out = exportArray.join('\n') + '\n';
    require("fs").writeFileSync(path.resolve(scanPath, 'index.ts'), out);
    console.log('Objects count included in index.ts:' + exportArray.length);
  }
});
