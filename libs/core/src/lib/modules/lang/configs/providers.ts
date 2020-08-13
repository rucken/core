import { DEFAULT_LANG_CONFIG, LANG_CONFIG_TOKEN } from './lang.config';
import { Provider } from '@angular/core';

export const LANG_PROVIDERS: Provider[] = [
  {
    provide: LANG_CONFIG_TOKEN,
    useValue: DEFAULT_LANG_CONFIG
  }
];
