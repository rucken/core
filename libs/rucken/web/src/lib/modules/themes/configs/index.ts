import { defaultThemesConfig, THEMES_CONFIG_TOKEN } from './themes.config';

export const themesConfigs: any = [
  {
    provide: THEMES_CONFIG_TOKEN,
    useValue: defaultThemesConfig
  }
];
