# rucken

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Gitter][gitter-image]][gitter-url]
[![Join the chat at telegram][telegram-image]][telegram-url]

Core with Admin UI for web and native application maked on Angular5+

## What is Rucken?

- **Core** - Base core for create applications on `Angular5+`.
- **Admin** - Include work with admin, user groups and permissions.
- **DI** - With dependency injection you can change base service.
- **Extends** - Write components with extends from core `rucken` components.

## Usage

- Clone or fork repository https://github.com/rucken/todo-web.git
- Read [README.md](https://github.com/rucken/todo-web/blob/master/README.md) for run application
- Modify app for your business logic

## Create empty application with [@ruken/cli](https://github.com/rucken/cli)

```
npm install -g @rucken/cli
rucken new my-app
cd my-app
npm install
npm start
```

## Quick links

[Source](https://github.com/rucken/core) - Source code.

[Demo](https://rucken.github.io/core) - Demo application with mock data worked.

[Demo (SSR)](https://rucken.herokuapp.com) - Demo application with server side rendering.

[Demo source](https://github.com/rucken/core/tree/master/apps/demo) - Source code of demo application.

## Sample projects

[Rucken: Todo](https://github.com/rucken/todo-web) - Simple todo application with: projects, tasks, statuses (backend: http://mockapi.io).

[Rucken: Demo (NestJS)](https://github.com/rucken/core-nestjs) - Simple application demonstrating the basic usage of permissions with NestJS (JWT, PasswordHash, User, Group, Permission, ContentType) (backend: NestJS).

[Rucken: Todo (Django)](https://github.com/rucken/todo-django) - Simple todo application with: auth, groups, permissions, projects, tasks, statuses (backend: Django + plugins).

## License

MIT

[travis-image]: https://travis-ci.org/rucken/core.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core
[gitter-image]: https://img.shields.io/gitter/room/rucken/core.js.svg
[gitter-url]: https://gitter.im/rucken/core
[npm-image]: https://badge.fury.io/js/%40rucken%2Fweb.svg
[npm-url]: https://npmjs.org/package/@rucken/web
[dependencies-image]: https://david-dm.org/rucken/core/status.svg
[dependencies-url]: https://david-dm.org/rucken/core
[telegram-image]: https://img.shields.io/badge/chat-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/rucken
