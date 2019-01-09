import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthEmptyPageComponent } from './components/auth-empty-page.component';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from './configs/auth.config';
import { defaultJwtConfig, JWT_CONFIG_TOKEN } from './configs/jwt.config';
import { defaultOauthConfig, OAUTH_CONFIG_TOKEN } from './configs/oauth.config';
import { OauthGuard } from './guards/oauth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService, authServiceInitializeApp } from './services/auth.service';
import { TokenService, tokenServiceInitializeApp } from './services/token.service';
@NgModule({
  declarations: [AuthEmptyPageComponent],
  imports: [CommonModule, NgxPermissionsModule, TranslateModule.forChild()],
  providers: [AuthService, TokenService, OauthGuard]
})
export class AuthModule {
  static forRoot(options?: { apiUrl?: string; oauth?: { providers?: string[] } }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultAuthConfig.apiUrl,
            infoUrl: defaultAuthConfig.infoUrl,
            signInUrl: defaultAuthConfig.signInUrl,
            signUpUrl: defaultAuthConfig.signUpUrl
          }
        },
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultJwtConfig.apiUrl,
            headerName: defaultJwtConfig.headerName,
            headerPrefix: defaultJwtConfig.headerPrefix,
            storageKeyName: defaultJwtConfig.storageKeyName,
            tokenName: defaultJwtConfig.tokenName,
            withoutTokenUrls: defaultJwtConfig.withoutTokenUrls
          }
        },
        {
          provide: OAUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultOauthConfig.apiUrl,
            redirectUrl: defaultOauthConfig.redirectUrl,
            signInUrl: defaultOauthConfig.signInUrl,
            providers: options.oauth && options.oauth.providers ? options.oauth.providers : defaultOauthConfig.providers
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
    oauth?: { providers?: string[] };
  }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultAuthConfig.apiUrl,
            infoUrl: defaultAuthConfig.infoUrl,
            signInUrl: defaultAuthConfig.signInUrl,
            signUpUrl: defaultAuthConfig.signUpUrl
          }
        },
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultJwtConfig.apiUrl,
            headerName: defaultJwtConfig.headerName,
            headerPrefix: defaultJwtConfig.headerPrefix,
            storageKeyName: defaultJwtConfig.storageKeyName,
            tokenName: defaultJwtConfig.tokenName,
            withoutTokenUrls: defaultJwtConfig.withoutTokenUrls
          }
        },
        {
          provide: OAUTH_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultOauthConfig.apiUrl,
            redirectUrl: defaultOauthConfig.redirectUrl,
            signInUrl: defaultOauthConfig.signInUrl,
            providers: options.oauth && options.oauth.providers ? options.oauth.providers : defaultOauthConfig.providers
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
