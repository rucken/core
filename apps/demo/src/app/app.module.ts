import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import {
  AccountConfig, AccountModule, AccountService, ContentTypesConfig,
  ErrorsExtractor, GroupsConfig, LangModule, PermissionsConfig,
  TokenInterceptor, TokenModule, TokenService, UsersConfig, accountServiceInitializeApp,
  tokenServiceInitializeApp, translate, TransferHttpCacheModule,
  RuI18n as CoreRuI18n
} from '@rucken/core';
import {
  AuthModalModule, NavbarModule, ThemesModule, ThemesService,
  themesServiceInitializeApp, RuI18n as WebRuI18n
} from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '.';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { RuI18n } from './i18n/ru.i18n';
import { CustomErrorHandler } from './shared/exceptions/error.handler';
import { environment } from '../environments/environment';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'demo' }),
    TransferHttpCacheModule.forRoot(),
    BrowserCookiesModule.forRoot(),
    LangModule.forRoot({
      languages: [{
        title: translate('Russian'),
        code: 'ru',
        translations: [WebRuI18n, CoreRuI18n, RuI18n]
      }, {
        title: translate('English'),
        code: 'en',
        translations: []
      }]
    }),
    NgxPermissionsModule.forRoot(),
    TokenModule.forRoot({
      withoutTokenUrls: [
        '/api/account/info',
        '/api/account/login',
        ...(environment.type === 'mockapi' ? ['/'] : [])
      ]
    }),
    AccountModule.forRoot(),
    ThemesModule.forRoot(),
    RouterModule.forRoot(AppRoutes,
      (environment.type === 'backend' || environment.type === 'development') ?
        { preloadingStrategy: PreloadAllModules } :
        { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }
    ),
    ModalModule.forRoot(),
    AuthModalModule,
    NavbarModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
    ErrorsExtractor,
    AccountConfig,
    GroupsConfig,
    PermissionsConfig,
    ContentTypesConfig,
    UsersConfig,
    BsLocaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
