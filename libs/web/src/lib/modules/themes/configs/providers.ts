import { Provider } from '@angular/core';
import { DEFAULT_THEMES_CONFIG, THEMES_CONFIG_TOKEN } from './themes.config';

export const THEMES_PROVIDERS: Provider[] = [
  {
    provide: THEMES_CONFIG_TOKEN,
    useValue: DEFAULT_THEMES_CONFIG
  }
];
