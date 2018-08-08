import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthService, authServiceInitializeApp } from './services/auth.service';
import {
  TokenService,
  tokenServiceInitializeApp
} from './services/token.service';
import { authConfigs } from './configs';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from './configs/auth.config';
import { JWT_CONFIG_TOKEN, defaultJwtConfig } from './configs/jwt.config';
import {
  FACEBOOK_CONFIG_TOKEN,
  defaultFacebookConfig
} from './configs/facebook.config';
import {
  GOOGLE_PLUS_CONFIG_TOKEN,
  defaultGooglePlusConfig
} from './configs/google-plus.config';

@NgModule({
  imports: [CommonModule, NgxPermissionsModule],
  providers: [AuthService, TokenService]
})
export class AuthModule {
  static forRoot(options?: { apiUri?: string }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri ? options.apiUri : defaultAuthConfig.apiUri,
            infoUri: defaultAuthConfig.infoUri,
            loginUri: defaultAuthConfig.loginUri,
            registerUri: defaultAuthConfig.registerUri
          }
        },
        {
          provide: JWT_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri ? options.apiUri : defaultJwtConfig.apiUri,
            headerName: defaultJwtConfig.headerName,
            headerPrefix: defaultJwtConfig.headerPrefix,
            storageKeyName: defaultJwtConfig.storageKeyName,
            tokenName: defaultJwtConfig.tokenName,
            withoutTokenUrls: defaultJwtConfig.withoutTokenUrls
          }
        },
        {
          provide: FACEBOOK_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri
              ? options.apiUri
              : defaultFacebookConfig.apiUri,
            redirectUri: defaultFacebookConfig.redirectUri,
            signinUri: defaultFacebookConfig.signinUri
          }
        },
        {
          provide: GOOGLE_PLUS_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri
              ? options.apiUri
              : defaultGooglePlusConfig.apiUri,
            redirectUri: defaultGooglePlusConfig.redirectUri,
            signinUri: defaultGooglePlusConfig.signinUri
          }
        },
        AuthService,
        TokenService,
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
