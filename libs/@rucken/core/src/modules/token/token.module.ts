import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TokenService } from './token.service';
import { TokenStorage } from './token.storage';
import { CookiesModule } from '../cookies/cookies.module';
@NgModule({
  imports: [
    CommonModule,
    CookiesModule.forRoot()
  ],
  providers: [
    TokenService,
    TokenStorage
  ]
})
export class TokenModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TokenModule,
      providers: [
        TokenService,
        TokenStorage
      ]
    };
  }
}
