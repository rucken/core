import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AccountConfig, ContentTypesConfig, ErrorsExtractor, GroupsConfig, LangModule, PermissionsConfig, RuI18n as CoreRuI18n, translate, UsersConfig } from '@rucken/core';
import { AuthModalModule, NavbarModule, RuI18n as WebRuI18n, ThemesModule } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
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
    BrowserModule.withServerTransition({ appId: 'demo' }),
    SharedModule,
    HttpClientModule,
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
    RouterModule.forRoot(AppRoutes,
      (environment.type === 'prod' || environment.type === 'development') ?
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
    CookieService,
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
