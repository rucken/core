import { ILanguagesItem } from './languages-item.interface';

export interface ILangConfig {
  languages?: ILanguagesItem[];
  appLang?: string;
  defaultLang?: string;
  storageKeyName?: string;
}
