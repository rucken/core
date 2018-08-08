import { defaultThemesConfig, THEMES_CONFIG_TOKEN } from './themes.config';

export const themesConfigs = [
  {
    provide: THEMES_CONFIG_TOKEN,
    useValue: defaultThemesConfig
  }
];
