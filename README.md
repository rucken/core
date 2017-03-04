<p align="center">
  <h1 align="center">Rucken</h1>
  <p align="center">
  Core with Admin UI for web application maked on Angular2+
  </p>
</p>

[![NPM version][npm-image]][npm-url]
[![Join the chat at telegram][telegram-image]][telegram-url]

Status: Beta

## What is Rucken?

- **Core** - Base core for create web applications on `Angular2`.
- **Admin** - Include work with admin, user groups and permissions.
- **DI** - With dependency injection you can change base service.
- **Extends** - Write components with extends from core `rucken` components.

#### Quick links

[Demo](https://site15.github.io/rucken) - Demo application with mock data worked.

[Demo source](https://github.com/site15/rucken/tree/master/demo) - Source code of dmo application.

## Install

```bash
npm install rucken --save
```

## Example use:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  RuckenComponents, RuckenServices, RuckenRoutingModule,
  ResponseService, HttpService, AccountService, AuthHttpFactory
} from 'rucken';
import { DemoAppComponent } from './app.component';
import { DemoResponseService } from './demo/shared/response.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DemoHttpService } from './demo/shared/http.service';
import { DemoAccountService } from './demo/shared/account.service';

@NgModule({
  declarations: [
    DemoAppComponent,
    RuckenComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    Ng2BootstrapModule,
    RuckenRoutingModule
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    RuckenServices,
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] },
    { provide: ResponseService, useClass: DemoResponseService },
    { provide: HttpService, useClass: DemoHttpService },
    { provide: AccountService, useClass: DemoAccountService }
  ],
  bootstrap: [DemoAppComponent]
})
export class AppModule { }
```

## License

MIT


[npm-image]: https://badge.fury.io/js/rucken.svg
[npm-url]: https://npmjs.org/package/rucken
[telegram-image]: https://img.shields.io/badge/chat-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/joinchat/AAAAAAtLpXFkn1XWDUFCFA
