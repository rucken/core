const fs = require('fs');
const f_gitignore = '.gitignore';
const f_package_json = 'package.json';

var data = '';

data = fs.readFileSync(f_gitignore, 'utf8');
var result = data.replace(/\/dist/g, '/dist/rucken').replace(/server.js/g, '');
fs.writeFileSync(f_gitignore, result, 'utf8');

console.log('Updated .gitignore');

data = fs.readFileSync(f_package_json, 'utf8');
var result = JSON.parse(data);
delete result['devDependencies'];
result.start = 'node ./server.js';
result.build = 'exit 0';
result.test = 'exit 0';
fs.writeFileSync(f_package_json, JSON.stringify(result), 'utf8');

console.log('Updated package.json');
