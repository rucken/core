import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AccountService } from './account.service';
import { AccountStorage } from './account.storage';
import { CookiesModule } from '../cookies/cookies.module';

@NgModule({
  imports: [
    CommonModule,
    CookiesModule.forRoot(),
    NgxPermissionsModule.forChild()
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
        AccountService,
        AccountStorage
      ]
    };
  }
}
