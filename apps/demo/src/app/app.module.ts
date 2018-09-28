import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MetaLoader, MetaModule } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AccountModule,
  AuthModule,
  entitiesProviders,
  ErrorsExtractor,
  LangModule,
  PermissionsGuard,
  TransferHttpCacheModule
} from '@rucken/core';
import { AuthModalModule, NavbarModule, ThemesModule } from '@rucken/web';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {
  AllRoutes,
  AppLangs,
  appMetaFactory,
  OauthModalProviders,
  OauthProviders
} from './app.config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'demo' }),
    TransferHttpCacheModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AuthModule.forRoot({
      apiUri: environment.apiUrl,
      oauth: {
        providers: OauthProviders
      }
    }),
    AccountModule.forRoot({
      apiUri: environment.apiUrl
    }),
    LangModule.forRoot({
      languages: AppLangs
    }),
    ThemesModule.forRoot(),
    RouterModule.forRoot(AllRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled'
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: appMetaFactory,
      deps: [TranslateService]
    }),
    ModalModule.forRoot(),
    AuthModalModule.forRoot({
      oauth: {
        providers: OauthModalProviders
      }
    }),
    NavbarModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    ...entitiesProviders,
    CookieService,
    ErrorsExtractor,
    BsLocaleService,
    PermissionsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
