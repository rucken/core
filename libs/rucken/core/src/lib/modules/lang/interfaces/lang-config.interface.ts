import { ILanguagesItem } from './languages-item.inteface';

export interface ILangConfig {
  languages?: ILanguagesItem[];
  appLang?: string;
  defaultLang?: string;
  storageKeyName?: string;
}
