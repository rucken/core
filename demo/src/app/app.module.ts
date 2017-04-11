import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {
  Ng2BootstrapModule, ComponentLoaderFactory, PositioningService, TooltipConfig,
  PaginationConfig, TabsetConfig, PopoverConfig, CollapseModule
} from 'ng2-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import {
  RuckenComponents, RuckenServices, RuckenRoutingModule, RepositoryHelper,
  EndpointHelper, HttpHelper, AccountService, AuthHttpFactory, ResourceSelectInputConfig,
  TextInputConfig, SelectInputConfig, TableColumnConfig
} from '../../../dist';
import { DemoAppComponent } from './app.component';
import { DemoEndpointHelper } from './demo/shared/helpers/endpoint.helper';
import { DemoHttpHelper } from './demo/shared/helpers/http.helper';
import { DemoAccountService } from './demo/shared/account.service';
//import { TranslatePoLoader } from '@biesbjerg/ng2-translate-po-loader';
import { DemoRepositoryHelper } from './demo/shared/helpers/repository.helper';
import { DemoNavbarComponent } from './demo/controls/navbar/navbar.component';
import { RouterModule } from '@angular/router';
/*
export function createTranslateLoader(http: Http) {
  return new TranslatePoLoader(http, 'assets/i18n', '.po');
}*/

@NgModule({
  declarations: [
    DemoNavbarComponent,
    DemoAppComponent,
    RuckenComponents
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    Ng2BootstrapModule,
    CollapseModule.forRoot(),
    Ng2AutoCompleteModule,
    TranslateModule.forRoot(/*{
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }*/),
    RouterModule.forRoot(RuckenRoutingModule.routes, { useHash: true })
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
export class AppModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: AppModule };
  }
}
