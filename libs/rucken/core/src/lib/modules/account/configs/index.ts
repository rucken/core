import { Provider } from '@angular/core';
import { ACCOUNT_CONFIG_TOKEN, defaultAccountConfig } from './account.config';

export const accountProviders: Provider[] = [
  {
    provide: ACCOUNT_CONFIG_TOKEN,
    useValue: defaultAccountConfig
  }
];
