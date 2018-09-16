import { defaultLangConfig, LANG_CONFIG_TOKEN } from './lang.config';
import { Provider } from '@angular/core';

export const langProviders: Provider[] = [
  {
    provide: LANG_CONFIG_TOKEN,
    useValue: defaultLangConfig
  }
];
