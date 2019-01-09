const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '.', 'dist', 'demo-client', 'index.html')).toString();
const win = domino.createWindow(template);
const files = fs.readdirSync(`${process.cwd()}/dist/demo-server`);
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { config } from 'dotenv';
import * as express from 'express';
import fetch from 'node-fetch';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';


win.fetch = fetch;
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
// global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const mainFiles = files.filter(file => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/demo-server/main.${hash}`);

config();

const DEBUG = process.env.DEBUG === 'true';
const PORT = process.env.PORT || 4000;

if (!DEBUG) {
  enableProdMode();
}

const app = express();
app.use(compression());
app.use(cookieparser());

const redirectowww = false;
const redirectohttps = true;
const wwwredirecto = true;

app.use((req, res, next) => {
  // for domain/index.html
  if (req.url === '/index.html') {
    res.redirect(301, 'https://' + req.hostname);
  }

  // check if it is a secure (https) request
  // if not redirect to the equivalent https url
  if (redirectohttps && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
    // special for robots.txt
    if (req.url === '/robots.txt') {
      next();
      return;
    }
    res.redirect(301, 'https://' + req.hostname + req.url);
  }

  // www or not
  if (redirectowww && !req.hostname.startsWith('www.')) {
    res.redirect(301, 'https://www.' + req.hostname + req.url);
  }

  // www or not
  if (wwwredirecto && req.hostname.startsWith('www.')) {
    const host = req.hostname.slice(4, req.hostname.length);
    res.redirect(301, 'https://' + host + req.url);
  }

  next();
});

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '.', 'apps', 'demo', 'src'));

app.get('*.*', express.static(path.join(__dirname, '.', 'dist', 'demo-client')));
// app.get(ROUTES, express.static(path.join(__dirname, '.', 'static')));

function ngApp(req, res) {
  global['navigator'] = req['headers']['user-agent'];
  const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];

  // tslint:disable-next-line:no-console
  console.time(`GET: ${req.originalUrl}`);
  res.render(
    '../../../dist/demo-client/index',
    {
      req: req,
      res: res,
      providers: [
        {
          provide: REQUEST, useValue: (req)
        },
        {
          provide: RESPONSE, useValue: (res)
        },
        {
          provide: 'ORIGIN_URL',
          useValue: (`${http}://${req.headers.host}`)
        }
      ]
    },
    (err, html) => {
      if (!!err) { throw err; }

      // tslint:disable-next-line:no-console
      console.timeEnd(`GET: ${req.originalUrl}`);
      res.send(html);
    }
  );
}

app.get('*', ngApp);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
