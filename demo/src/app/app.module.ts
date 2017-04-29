import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  ComponentLoaderFactory, PositioningService, TooltipConfig,
  PaginationConfig, TabsetConfig, PopoverConfig
} from 'ngx-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  RuckenComponents, RuckenServices, RepositoryHelper,
  EndpointHelper, HttpHelper, AccountService, AuthHttpFactory, ResourceSelectInputConfig,
  TextInputConfig, SelectInputConfig, TableColumnConfig,
  TextInputModule, ModalFooterButtonsModule, AuthModalModule, AlertModalModule
} from '../../../dist';
import { DemoAppComponent } from './app.component';
import { DemoEndpointHelper } from './demo/shared/helpers/endpoint.helper';
import { DemoHttpHelper } from './demo/shared/helpers/http.helper';
import { DemoAccountService } from './demo/shared/account.service';
import { DemoRepositoryHelper } from './demo/shared/helpers/repository.helper';
import { RouterModule } from '@angular/router';
import { DemoRoutes } from './app.routes';
import { DemoNavbarModule } from './demo/controls/navbar/navbar.module';

@NgModule({
  declarations: [
    DemoAppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModalModule.forRoot(),
    DemoNavbarModule.forRoot(),
    AuthModalModule.forRoot(),
    TranslateModule.forRoot(),
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
    ResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] },
    { provide: RepositoryHelper, useClass: DemoRepositoryHelper },
    { provide: EndpointHelper, useClass: DemoEndpointHelper },
    { provide: HttpHelper, useClass: DemoHttpHelper },
    { provide: AccountService, useClass: DemoAccountService }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: DemoAppModule };
  }
}
