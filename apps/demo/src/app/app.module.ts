import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppService, EndpointHelper, HttpHelper, RepositoryHelper, RuckenCoreServices, ThemesService } from '@rucken/core';
import { TokenService } from '@rucken/core';
import {
  AlertModalModule,
  BaseResourceSelectInputConfig,
  RuckenWebServices,
  SelectInputConfig,
  SharedModule,
  TableColumnConfig,
  TextInputConfig,
  WebAppService,
  WebThemesService,
  WebTokenService,
} from '@rucken/web';
import {
  ComponentLoaderFactory,
  PaginationConfig,
  PopoverConfig,
  PositioningService,
  TabsetConfig,
  TooltipConfig,
  BsLocaleService
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
    HttpClientModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    }),
    SharedModule.forRoot(),
    AlertModalModule.forRoot(),
    DemoNavbarModule.forRoot(),
    RouterModule.forRoot(DemoRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    PopoverConfig,
    BsLocaleService,
    RuckenCoreServices,
    RuckenWebServices,
    BaseResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    { provide: ThemesService, useClass: WebThemesService },
    { provide: AppService, useClass: WebAppService },
    { provide: TokenService, useClass: WebTokenService },
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
