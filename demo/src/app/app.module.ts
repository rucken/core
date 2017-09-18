import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  ComponentLoaderFactory, PositioningService, TooltipConfig,
  PaginationConfig, TabsetConfig, PopoverConfig
} from 'ngx-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TranslateModule, TranslateFakeLoader, TranslateLoader } from '@ngx-translate/core';
import {
  RuckenComponents, RuckenServices, RepositoryHelper,
  EndpointHelper, HttpHelper, AccountService, AuthHttpFactory,
  BaseResourceSelectInputConfig,
  TextInputConfig, SelectInputConfig, TableColumnConfig,
  TextInputModule, AuthModalModule, AlertModalModule
} from 'rucken';
import { DemoAppComponent } from './app.component';
import { DemoEndpointHelper } from './demo/shared/helpers/endpoint.helper';
import { RouterModule } from '@angular/router';
import { DemoRoutes } from './app.routes';
import { DemoNavbarModule } from './demo/controls/navbar/navbar.module';
import { LaddaModule } from 'angular2-ladda';
import { DemoHttpHelper } from './demo/shared/helpers/http.helper';
import { SharedModule } from 'rucken';

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
    RuckenServices,
    BaseResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
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
