import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AccountService, accountServiceInitializeApp } from './account.service';
import { AccountStorage } from './account.storage';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserCookiesModule.forRoot(),
    NgxPermissionsModule
  ],
  providers: [
    AccountService,
    AccountStorage
  ]
})
export class AccountModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: accountServiceInitializeApp,
          multi: true,
          deps: [AccountService]
        }
      ]
    };
  }
}
