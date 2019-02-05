import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthEmptyPageComponent } from './components/auth-empty-page.component';
import { AUTH_CONFIG_TOKEN, DEFAULT_AUTH_CONFIG } from './configs/auth.config';
import { DEFAULT_JWT_CONFIG, JWT_CONFIG_TOKEN } from './configs/jwt.config';
import { DEFAULT_OAUTH_CONFIG, OAUTH_CONFIG_TOKEN } from './configs/oauth.config';
import { OauthGuard } from './guards/oauth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { IAuthOauthProvider } from './interfaces/auth-oauth-provider.interface';
import { AuthService, authServiceInitializeApp } from './services/auth.service';
import { TokenService, tokenServiceInitializeApp } from './services/token.service';
@NgModule({
  declarations: [AuthEmptyPageComponent],
  imports: [CommonModule, NgxPermissionsModule, TranslateModule.forChild()],
  providers: [AuthService, TokenService, OauthGuard]
})
export class AuthModule {
  static forRoot(options?: { apiUrl?: string; oauth?: { providers?: IAuthOauthProvider[] } }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_AUTH_CONFIG.apiUrl,
            infoUrl: DEFAULT_AUTH_CONFIG.infoUrl,
            signInUrl: DEFAULT_AUTH_CONFIG.signInUrl,
            signUpUrl: DEFAULT_AUTH_CONFIG.signUpUrl
          }
        },
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_JWT_CONFIG.apiUrl,
            headerName: DEFAULT_JWT_CONFIG.headerName,
            headerPrefix: DEFAULT_JWT_CONFIG.headerPrefix,
            storageKeyName: DEFAULT_JWT_CONFIG.storageKeyName,
            tokenName: DEFAULT_JWT_CONFIG.tokenName,
            withoutTokenUrls: DEFAULT_JWT_CONFIG.withoutTokenUrls
          }
        },
        {
          provide: OAUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_OAUTH_CONFIG.apiUrl,
            redirectUrl: DEFAULT_OAUTH_CONFIG.redirectUrl,
            signInUrl: DEFAULT_OAUTH_CONFIG.signInUrl,
            providers: options.oauth && options.oauth.providers ? options.oauth.providers : DEFAULT_OAUTH_CONFIG.providers
          }
        },
        AuthService,
        TokenService,
        OauthGuard,
        TokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TokenInterceptor,
          multi: true
        }
      ]
    };
  }
  static forRootWithAppInitializer(options?: {
    apiUrl?: string;
    oauth?: { providers?: IAuthOauthProvider[] };
  }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_AUTH_CONFIG.apiUrl,
            infoUrl: DEFAULT_AUTH_CONFIG.infoUrl,
            signInUrl: DEFAULT_AUTH_CONFIG.signInUrl,
            signUpUrl: DEFAULT_AUTH_CONFIG.signUpUrl
          }
        },
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_JWT_CONFIG.apiUrl,
            headerName: DEFAULT_JWT_CONFIG.headerName,
            headerPrefix: DEFAULT_JWT_CONFIG.headerPrefix,
            storageKeyName: DEFAULT_JWT_CONFIG.storageKeyName,
            tokenName: DEFAULT_JWT_CONFIG.tokenName,
            withoutTokenUrls: DEFAULT_JWT_CONFIG.withoutTokenUrls
          }
        },
        {
          provide: OAUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_OAUTH_CONFIG.apiUrl,
            redirectUrl: DEFAULT_OAUTH_CONFIG.redirectUrl,
            signInUrl: DEFAULT_OAUTH_CONFIG.signInUrl,
            providers: options.oauth && options.oauth.providers ? options.oauth.providers : DEFAULT_OAUTH_CONFIG.providers
          }
        },
        AuthService,
        TokenService,
        OauthGuard,
        TokenInterceptor,
        {
          provide: APP_INITIALIZER,
          useFactory: tokenServiceInitializeApp,
          multi: true,
          deps: [TokenService]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: TokenInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: authServiceInitializeApp,
          multi: true,
          deps: [AuthService]
        }
      ]
    };
  }
}
