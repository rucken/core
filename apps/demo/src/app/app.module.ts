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
  RuI18n as CoreRuI18n,
  TransferHttpCacheModule,
  translate,
  UsersConfig,
  AuthModule,
  OauthGuard,
  AuthEmptyComponent
} from '@rucken/core';
import {
  AuthModalModule,
  NavbarModule,
  RuI18n as WebRuI18n,
  ThemesModule
} from '@rucken/web';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

const Langs = [
  {
    title: translate('Russian'),
    code: 'ru',
    translations: [WebRuI18n, CoreRuI18n, RuI18n]
  },
  {
    title: translate('English'),
    code: 'en',
    translations: []
  }
];
const OauthProviders = ['facebook', 'google-plus'];
const OauthModalProviders = [
  {
    name: 'facebook',
    icon: ['fab', 'facebook-square'],
    signInTitle: translate('Sign in with Facebook')
  },
  {
    name: 'google-plus',
    icon: ['fab', 'google-plus'],
    signInTitle: translate('Sign in with Google+')
  }
];
const OauthRoutes = [
  {
    path: 'auth/facebook',
    component: AuthEmptyComponent,
    canActivate: [OauthGuard],
    data: {
      oauth: {
        provider: 'facebook',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  },
  {
    path: 'auth/google-plus',
    component: AuthEmptyComponent,
    canActivate: [OauthGuard],
    data: {
      oauth: {
        provider: 'google-plus',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  }
];
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
      languages: Langs
    }),
    ThemesModule.forRoot(),
    RouterModule.forRoot([...OauthRoutes, ...AppRoutes], {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled'
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
export class AppModule {}
