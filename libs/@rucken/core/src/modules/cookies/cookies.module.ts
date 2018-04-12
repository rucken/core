import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserCookiesService } from './browser-cookies.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CookieService,
    BrowserCookiesService
  ]
})
export class CookiesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CookiesModule,
      providers: [
        CookieService,
        BrowserCookiesService
      ]
    };
  }
}
