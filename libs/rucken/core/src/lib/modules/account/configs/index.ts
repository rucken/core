import { Provider } from '@angular/core';
import { ACCOUNT_CONFIG_TOKEN, DEFAULT_ACCOUNT_CONFIG } from './account.config';

export const ACCOUNT_PROVIDERS: Provider[] = [
  {
    provide: ACCOUNT_CONFIG_TOKEN,
    useValue: DEFAULT_ACCOUNT_CONFIG
  }
];
