import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { Ng2BootstrapModule, ComponentLoaderFactory, PositioningService, TooltipConfig, PaginationConfig, TabsetConfig } from 'ng2-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {
  CoreComponents, CoreServices, CoreRoutingModule,
  ResponseService, HttpService, AccountService, AuthHttpFactory
} from '../../../dist';
import { DemoAppComponent } from './app.component';
import { DemoResponseService } from './demo/shared/response.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslatePoLoader } from '@biesbjerg/ng2-translate-po-loader';
import { DemoHttpService } from './demo/shared/http.service';
import { DemoAccountService } from './demo/shared/account.service';
/*
export function createTranslateLoader(http: Http) {
  return new TranslatePoLoader(http, 'assets/i18n', '.po');
}*/

@NgModule({
  declarations: [
    DemoAppComponent,
    CoreComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(/*{
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }*/),
    Ng2BootstrapModule,
    CoreRoutingModule
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    CoreServices,
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] },
    { provide: ResponseService, useClass: DemoResponseService },
    { provide: HttpService, useClass: DemoHttpService },
    { provide: AccountService, useClass: DemoAccountService }
  ],
  bootstrap: [DemoAppComponent]
})
export class AppModule { }
