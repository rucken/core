import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { accountProviders } from './configs';
import { AccountService } from './account.service';
import { ACCOUNT_CONFIG_TOKEN, defaultAccountConfig } from './configs/account.config';
@NgModule({
  imports: [CommonModule],
  providers: [AccountService]
})
export class AccountModule {
  static forRoot(options?: { apiUrl?: string }): ModuleWithProviders {
    return {
      ngModule: AccountModule,
      providers: [
        {
          provide: ACCOUNT_CONFIG_TOKEN,
          useValue: {
            apiUrl: options.apiUrl ? options.apiUrl : defaultAccountConfig.apiUrl,
            updateUrl: defaultAccountConfig.updateUrl
          }
        },
        AccountService
      ]
    };
  }
}
