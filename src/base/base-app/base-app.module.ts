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
import { BaseAppComponent } from './base-app.component';
import { RouterModule } from '@angular/router';
import { AlertModalModule } from './../../modals/alert-modal/alert-modal.module';
import { NavbarModule } from './../../controls/navbar/navbar.module';
import { AuthModalModule } from './../../modals/auth-modal/auth-modal.module';
import { BaseRoutes } from './base-app.routes';
import { BaseResourceSelectInputConfig } from './../base-resources-grid/base-resource-select-input/base-resource-select-input.config';
import { TextInputConfig } from './../../controls/text-input/text-input.config';
import { SelectInputConfig } from './../../controls/select-input/select-input.config';
import { TableColumnConfig } from './../../controls/table-column/table-column.config';
import { AuthHttpFactory } from './../../shared/factories/auth-http.factory';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BaseAppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModalModule.forRoot(),
    NavbarModule.forRoot(),
    AuthModalModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(BaseRoutes, { useHash: true })
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    PopoverConfig,
    BaseResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] }
  ],
  bootstrap: [BaseAppComponent]
})
export class BaseAppModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: BaseAppModule };
  }
}
