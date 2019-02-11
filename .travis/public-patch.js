const fs = require('fs');
const f_gitignore = './.gitignore';
const f_package_json = './package.json';

var data = '', obj = {}, txt = '';

data = fs.readFileSync(f_gitignore, 'utf8');
txt = data.replace(/\/dist/g, '/dist/rucken').replace(/server.js/g, '');
fs.writeFileSync(f_gitignore, txt, 'utf8');

console.log('Updated .gitignore');
console.log(txt);

data = fs.readFileSync(f_package_json, 'utf8');
obj = JSON.parse(data);
delete obj['devDependencies'];
obj.start = 'node ./server.js';
obj.build = 'exit 0';
obj.test = 'exit 0';
fs.writeFileSync(f_package_json, JSON.stringify(obj), 'utf8');

console.log('Updated package.json');
console.log(JSON.stringify(obj));
