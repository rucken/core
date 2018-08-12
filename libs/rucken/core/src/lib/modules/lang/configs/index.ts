import { defaultLangConfig, LANG_CONFIG_TOKEN } from './lang.config';

export const langConfigs: any = [
  {
    provide: LANG_CONFIG_TOKEN,
    useValue: defaultLangConfig
  }
];
