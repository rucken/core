var path = require('path');
require("http").get({
    host: load.host,
    path: load.path
}, function (response) {
    var body = "";
    response.on("data", function (chunk) { body += chunk });
    response.on("end", function () {
        var version = body.match(/^ \*  Font Awesome ([\d.]+)/m);
        if (!version) { console.log("Couldn't parse version"); return process.exit(1); }
        else version = version[1];

        console.log("Font Awesome v" + version);

        var namecount = 0;
        var main = body.match(/(\}\.fa-[a-z\-]+(?::before,\.fa-[a-z\-]+)*):before\{content:"\\([0-9a-f]+)"/g);
        if (!main) { console.log("Couldn't parse icons"); return process.exit(1); }
        var items = [];
        for (var i = 0; i < main.length; i++) {
            var icon = main[i].match(/(\}\.fa-[a-z\-]+(?::before,\.fa-[a-z\-]+)*):before\{content:"\\([0-9a-f]+)"/).slice(1);
            icon[0] = icon[0].substr(5).split(/:before,\.fa-/);
            namecount += icon[0].length;
            items.push({
                code: "\\" + icon[1],
                class: 'fa fa-' + icon[0][0]
            });
        }
        var out = 'export const FontawesomeItemsMock = ' + JSON.stringify(items, null, 4) + ';';
        require("fs").writeFileSync(path.resolve(__destdir, save.path), out);
        console.log(main.length + " icons parsed (" + namecount + " names)")
    });
});
