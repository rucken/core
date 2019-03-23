import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { IStorage } from '../../storage/interfaces/storage.interface';
import { LANG_CONFIG_TOKEN } from '../configs/lang.config';
import { LANGUAGES_ITEM_CONFIG_TOKEN } from '../configs/languages-item.config';
import { ILangConfig } from '../interfaces/lang-config.interface';
import { ILanguagesItem } from '../interfaces/languages-item.interface';

export function langServiceInitializeApp(langService: LangService) {
  return () => langService.initializeApp();
}
@Injectable()
export class LangService {
  @BindObservable()
  current: string = undefined;
  current$: Observable<string>;
  @BindObservable()
  languages: ILanguagesItem[] = [];
  languages$: Observable<ILanguagesItem[]>;

  constructor(
    @Inject(LANG_CONFIG_TOKEN) private _langConfig: ILangConfig,
    @Inject(LANGUAGES_ITEM_CONFIG_TOKEN) private _languagesItemConfig: ILanguagesItem,
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
    private _translateService: TranslateService
  ) { }
  initLanguages() {
    let languagesItemConfig: ILanguagesItem | ILanguagesItem[] = this._languagesItemConfig;
    if (!Array.isArray(languagesItemConfig)) {
      languagesItemConfig = [languagesItemConfig];
    }
    const languagesByCode: { [code: string]: ILanguagesItem } = {};
    [...this._langConfig.languages, ...languagesItemConfig].forEach(lang => {
      if (!languagesByCode[lang.code] && lang) {
        languagesByCode[lang.code] = { code: lang.code };
      }
      if (!languagesByCode[lang.code].title && lang.title) {
        languagesByCode[lang.code].title = lang.title;
      }
      if (!languagesByCode[lang.code].translations && lang.translations) {
        languagesByCode[lang.code].translations = lang.translations;
      } else {
        languagesByCode[lang.code].translations = [...languagesByCode[lang.code].translations, ...lang.translations];
      }
    });
    const languages = Object.keys(languagesByCode).map(key => languagesByCode[key]);
    this._translateService.setDefaultLang(this._langConfig.appLang);
    this._translateService.addLangs(languages.map((lang: ILanguagesItem) => lang.code));
    languages.map(lang => {
      let translations = {};
      lang.translations.map(translation => (translations = { ...translations, ...translation }));
      this._translateService.setTranslation(lang.code, translations);
    });
    return Promise.resolve(languages);
  }
  initCurrent() {
    return new Promise((resolve, reject) => {
      this._storage.getItem(this._langConfig.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          resolve(data);
        } else {
          resolve(this.getCurrent());
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initLanguages().then(languages => {
        this.setLanguages(languages);
        this.initCurrent().then(value => {
          this.setCurrent(value as string);
          resolve();
        });
      });
    });
  }
  getCurrent() {
    if (!this.current) {
      return this._langConfig.defaultLang;
    }
    return this.current;
  }
  setCurrent(value: string) {
    if (!value) {
      this._translateService.use(value);
      this._storage.removeItem(this._langConfig.storageKeyName).then(_ => {
        this.current = value;
      });
    } else {
      this._translateService.use(value);
      this._storage.setItem(this._langConfig.storageKeyName, value).then(_ => {
        this.current = value;
      });
    }
  }
  getLanguages() {
    if (!this.languages) {
      return this._langConfig.languages;
    }
    return this.languages;
  }
  setLanguages(langs: ILanguagesItem[]) {
    this.languages = langs;
  }
}
