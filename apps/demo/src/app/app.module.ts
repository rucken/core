import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  AccountService,
  AppService,
  EndpointHelper,
  HttpHelper,
  RepositoryHelper,
  RuckenCoreServices,
  ThemesService,
} from '@rucken/core';
import {
  AlertModalModule,
  AuthHttpFactory,
  BaseResourceSelectInputConfig,
  RuckenWebServices,
  SelectInputConfig,
  SharedModule,
  TableColumnConfig,
  TextInputConfig,
  WebAccountService,
  WebAppService,
  WebThemesService,
} from '@rucken/web';
import { AuthHttp } from 'angular2-jwt';
import { LaddaModule } from 'angular2-ladda';
import {
  ComponentLoaderFactory,
  PaginationConfig,
  PopoverConfig,
  PositioningService,
  TabsetConfig,
  TooltipConfig,
} from 'ngx-bootstrap';

import { DemoAppComponent } from './app.component';
import { DemoRoutes } from './app.routes';
import { DemoNavbarModule } from './controls/navbar/navbar.module';
import { DemoEndpointHelper } from './shared/helpers/endpoint.helper';
import { DemoHttpHelper } from './shared/helpers/http.helper';

@NgModule({
  declarations: [
    DemoAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LaddaModule.forRoot({
      style: 'expand-left',
      spinnerColor: 'white',
      spinnerLines: 12
    }),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    }),
    SharedModule.forRoot(),
    AlertModalModule.forRoot(),
    DemoNavbarModule.forRoot(),
    RouterModule.forRoot(DemoRoutes, { useHash: true })
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    PopoverConfig,
    RuckenCoreServices,
    RuckenWebServices,
    BaseResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    { provide: ThemesService, useClass: WebThemesService },
    { provide: AppService, useClass: WebAppService },
    { provide: AccountService, useClass: WebAccountService },
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] },
    { provide: EndpointHelper, useClass: DemoEndpointHelper },
    { provide: RepositoryHelper, useClass: RepositoryHelper },
    { provide: HttpHelper, useClass: DemoHttpHelper }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DemoAppModule };
  }
}
