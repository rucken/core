import { defaultAccountConfig, ACCOUNT_CONFIG_TOKEN } from './account.config';

export const accountConfigs = [
  {
    provide: ACCOUNT_CONFIG_TOKEN,
    useValue: defaultAccountConfig
  }
];
