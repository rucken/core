import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccountService } from './account.service';
import { ACCOUNT_CONFIG_TOKEN, DEFAULT_ACCOUNT_CONFIG } from './configs/account.config';
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
            apiUrl: options.apiUrl ? options.apiUrl : DEFAULT_ACCOUNT_CONFIG.apiUrl,
            updateUrl: DEFAULT_ACCOUNT_CONFIG.updateUrl
          }
        },
        AccountService
      ]
    };
  }
}
