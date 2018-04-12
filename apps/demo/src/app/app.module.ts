import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AccountConfig, AccountModule, AccountService, ContentTypesConfig, ErrorsExtractor, GroupsConfig, LangModule, PermissionsConfig, RuckenCoreRuI18n, TokenModule, TokenService, UsersConfig, accountServiceInitializeApp, tokenServiceInitializeApp, translate } from '@rucken/core';
import { AuthModalModule, MessageModalModule, NavbarModule, RuckenWebRuI18n, ThemesModule, ThemesService, themesServiceInitializeApp } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxRepositoryModule } from 'ngx-repository';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { DemoRuI18n } from './i18n/ru.i18n';
import { CustomErrorHandler } from './shared/exceptions/error.handler';
import { CookiesModule } from '@rucken/core';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'demo' }),
    CookiesModule.forRoot(),
    LangModule.forRoot({
      languages: [{
        title: translate('Russian'),
        code: 'ru',
        translations: [RuckenWebRuI18n, RuckenCoreRuI18n, DemoRuI18n]
      }, {
        title: translate('English'),
        code: 'en',
        translations: []
      }]
    }),
    TokenModule.forRoot(),
    AccountModule.forRoot(),
    ThemesModule.forRoot(),
    NgxRepositoryModule.forRoot(),
    ModalModule.forRoot(),
    AuthModalModule.forRoot(),
    HttpClientModule,
    NavbarModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    MessageModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TransferHttpCacheModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: tokenServiceInitializeApp,
      multi: true,
      deps: [TokenService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: themesServiceInitializeApp,
      multi: true,
      deps: [ThemesService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: accountServiceInitializeApp,
      multi: true,
      deps: [AccountService]
    },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
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
