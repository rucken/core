import { defaultLangConfig, LANG_CONFIG_TOKEN } from './lang.config';

export const langConfigs = [
  {
    provide: LANG_CONFIG_TOKEN,
    useValue: defaultLangConfig
  }
];
