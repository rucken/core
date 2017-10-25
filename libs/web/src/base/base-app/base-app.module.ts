import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import {
  ComponentLoaderFactory,
  PaginationConfig,
  PopoverConfig,
  PositioningService,
  TabsetConfig,
  TooltipConfig,
} from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { NavbarModule } from './../../controls/navbar/navbar.module';
import { SelectInputConfig } from './../../controls/select-input/select-input.config';
import { TableColumnConfig } from './../../controls/table-column/table-column.config';
import { TextInputConfig } from './../../controls/text-input/text-input.config';
import { AlertModalModule } from './../../modals/alert-modal/alert-modal.module';
import { AuthModalModule } from './../../modals/auth-modal/auth-modal.module';
import { AuthHttpFactory } from './../../shared/factories/auth-http.factory';
import {
  BaseResourceSelectInputConfig,
} from './../base-resources-grid/base-resource-select-input/base-resource-select-input.config';
import { BaseAppComponent } from './base-app.component';
import { BaseRoutes } from './base-app.routes';


@NgModule({
  declarations: [
    BaseAppComponent
  ],
  imports: [
    SharedModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModalModule.forRoot(),
    NavbarModule.forRoot(),
    AuthModalModule.forRoot(),
    RouterModule.forRoot(BaseRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    PopoverConfig,
    BaseResourceSelectInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    TextInputConfig,
    { provide: AuthHttp, useFactory: AuthHttpFactory.create, deps: [Http, RequestOptions] }
  ],
  bootstrap: [BaseAppComponent]
})
export class BaseAppModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: BaseAppModule };
  }
}
