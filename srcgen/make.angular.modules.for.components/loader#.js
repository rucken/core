var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    srcgen = require('srcgen'),
    recursive = require('recursive-readdir'),
    replaceExt = require('replace-ext');
var scanPath = path.resolve(__srcdir, '../../', scan.path);
console.log('Scan dir:' + scanPath);
recursive(scanPath, ['!*.ts'], function (err, files) {
    var exportArray = [];
    var delmitters = [
        { prefix: 'class ', postfix: ' ' }//,
        //{ prefix: 'const ', postfix: ' ' },
        //{ prefix: 'enum ', postfix: ' ' },
        //{ prefix: 'interface ', postfix: ' ' }
    ];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var content = srcgen.utils.load(file);
        content = content.replace(/  +/g, ' ').replace(new RegExp(':', 'g'), ' ');
        for (var d = 0; d < delmitters.length; d++) {
            var delmitter = delmitters[d];
            var items = srcgen.between.get(content, delmitter.prefix, delmitter.postfix);
            for (var j = 0; j < items.length; j++) {
                var className = items[j].trim();
                if (_.camelCase(className).toLowerCase() === className.toLowerCase() && className.toLowerCase()[0] !== className[0]) {
                    var classFile = replaceExt(
                        file.replace(scanPath, '').replace(new RegExp('\\' + path.sep, 'g'), '/'),
                        '').split(path.sep).join("/");
                    var oldClassFile=path.resolve(scanPath, '.'+replaceExt(classFile,'.component.html'));
                    var newClassFile=path.resolve(scanPath, '.'+replaceExt(classFile,'.module.ts'));
                    if (!srcgen.utils.exists(newClassFile) && srcgen.utils.exists(oldClassFile)){
                        console.log(newClassFile);
                        var result = srcgen.builder.template(
                            path.resolve(__dirname, './angular.module!.ts'),
                            { ComponentName: className.replace('Component','') }
                        );
                        srcgen.utils.save(newClassFile, result);
                    }
                }
            }
        }
    }
});
