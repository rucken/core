import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { TokenModuleConfig } from './token-module.config';
import { TokenInterceptor, WITHOUT_TOKEN_URLS } from './token.inerceptor';
import { TokenService, tokenServiceInitializeApp } from './token.service';
import { TokenStorage } from './token.storage';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TokenService,
    TokenStorage
  ]
})
export class TokenModule {
  static forRoot(config: TokenModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TokenModule,
      providers: [
        TokenInterceptor,
        {
          provide: APP_INITIALIZER,
          useFactory: tokenServiceInitializeApp,
          multi: true,
          deps: [TokenService]
        },
        { provide: HTTP_INTERCEPTORS, useExisting: TokenInterceptor, multi: true },
        { provide: WITHOUT_TOKEN_URLS, useValue: config.withoutTokenUrls }
      ]
    };
  }
}
