import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  AccountModule,
  ContentTypesConfig,
  ErrorsExtractor,
  GroupsConfig,
  LangModule,
  PermissionsConfig,
  PermissionsGuard,
  TransferHttpCacheModule,
  UsersConfig,
  AuthModule
} from '@rucken/core';
import { AuthModalModule, NavbarModule, ThemesModule } from '@rucken/web';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MetaModule, MetaLoader } from '@ngx-meta/core';
import {
  OauthProviders,
  AppLangs,
  AllRoutes,
  OauthModalProviders,
  appMetaFactory
} from './app.config';
import { TranslateService } from '@ngx-translate/core';

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
    CookieService,
    ErrorsExtractor,
    GroupsConfig,
    PermissionsConfig,
    ContentTypesConfig,
    UsersConfig,
    BsLocaleService,
    PermissionsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
