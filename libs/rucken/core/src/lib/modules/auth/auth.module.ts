import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthService, authServiceInitializeApp } from './services/auth.service';
import {
  TokenService,
  tokenServiceInitializeApp
} from './services/token.service';
import { authProviders } from './configs';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_CONFIG_TOKEN, defaultAuthConfig } from './configs/auth.config';
import { JWT_CONFIG_TOKEN, defaultJwtConfig } from './configs/jwt.config';
import { OAUTH_CONFIG_TOKEN, defaultOauthConfig } from './configs/oauth.config';
import { TranslateModule } from '@ngx-translate/core';
import { OauthGuard } from './guards/oauth.guard';
import { AuthEmptyComponent } from './components/auth-empty.component';
@NgModule({
  declarations: [AuthEmptyComponent],
  imports: [CommonModule, NgxPermissionsModule, TranslateModule.forChild()],
  providers: [AuthService, TokenService, OauthGuard]
})
export class AuthModule {
  static forRoot(options?: {
    apiUri?: string;
    oauth?: { providers?: string[] };
  }): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri ? options.apiUri : defaultAuthConfig.apiUri,
            infoUri: defaultAuthConfig.infoUri,
            signInUri: defaultAuthConfig.signInUri,
            signUpUri: defaultAuthConfig.signUpUri
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
          provide: OAUTH_CONFIG_TOKEN,
          useValue: {
            apiUri: options.apiUri ? options.apiUri : defaultOauthConfig.apiUri,
            redirectUri: defaultOauthConfig.redirectUri,
            signInUri: defaultOauthConfig.signInUri,
            providers:
              options.oauth && options.oauth.providers
                ? options.oauth.providers
                : defaultOauthConfig.providers
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
