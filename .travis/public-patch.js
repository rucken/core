const fs = require('fs');
const f_gitignore = '.gitignore';
const f_package_json = 'package.json';

fs.readFile(f_gitignore, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = data.replace(/\/dist/g, '/dist/rucken').replace(/server.js/g, '');
    fs.writeFile(f_gitignore, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});

fs.readFile(f_package_json, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var result = JSON.parse(data);
    delete result['devDependencies'];
    result.start = 'node ./server.js';
    result.build = 'exit 0';
    result.test = 'exit 0';
    fs.writeFile(f_package_json, JSON.stringify(result), 'utf8', function (err) {
        if (err) return console.log(err);
    });
});
