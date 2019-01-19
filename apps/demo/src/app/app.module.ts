import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MetaLoader, MetaModule } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountModule, AuthModalModule, AuthModule, entitiesProviders, ErrorsExtractor, LangModule, PermissionsGuard, TransferHttpCacheModule } from '@rucken/core';
import { NavbarModule, ThemesModule, WebAuthModalModule, WebModalsModule } from '@rucken/web';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AllRoutes, AppLangs, appMetaFactory, AppId, OauthModalProviders, OauthProviders } from './app.config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: AppId }),
    TransferHttpCacheModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AuthModule.forRoot({
      apiUrl: environment.apiUrl,
      oauth: {
        providers: OauthProviders
      }
    }),
    AccountModule.forRoot({
      apiUrl: environment.apiUrl
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
    AuthModalModule.forRoot({
      oauth: {
        providers: OauthModalProviders
      }
    }),
    WebAuthModalModule,
    NavbarModule,
    BsDatepickerModule.forRoot(),
    WebModalsModule
  ],
  providers: [...entitiesProviders, CookieService, ErrorsExtractor, BsLocaleService, PermissionsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
