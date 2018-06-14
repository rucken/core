import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AccountService, accountServiceInitializeApp } from './account.service';
import { AccountStorage } from './account.storage';

@NgModule({
  imports: [
    CommonModule,
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
