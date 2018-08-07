import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  AccountModule, ContentTypesConfig, ErrorsExtractor, GroupsConfig, LangModule,
  PermissionsConfig, PermissionsGuard, RuI18n as CoreRuI18n, TransferHttpCacheModule,
  translate, UsersConfig, AuthModule, ACCOUNT_CONFIG_TOKEN, GOOGLE_PLUS_CONFIG_TOKEN,
  FACEBOOK_CONFIG_TOKEN, JWT_CONFIG_TOKEN, AUTH_CONFIG_TOKEN, defaultAuthConfig,
  defaultJwtConfig, defaultFacebookConfig, defaultGooglePlusConfig, defaultAccountConfig
} from '@rucken/core';
import { AuthModalModule, NavbarModule, RuI18n as WebRuI18n, ThemesModule } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { RuI18n } from './i18n/ru.i18n';
import { SharedModule } from './shared/shared.module';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'demo' }),
    TransferHttpCacheModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AuthModule.forRoot({
      apiUri: environment.apiUrl
    }),
    AccountModule.forRoot({
      apiUri: environment.apiUrl
    }),
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
    ThemesModule.forRoot(),
    RouterModule.forRoot(
      AppRoutes,
      { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }
    ),
    ModalModule.forRoot(),
    AuthModalModule,
    NavbarModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
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
export class AppModule {
}
