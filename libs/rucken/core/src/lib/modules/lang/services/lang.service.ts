import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { IStorage } from '../../storage/interfaces/storage.interface';
import { LANG_CONFIG_TOKEN } from '../configs/lang.config';
import { ILangConfig } from '../interfaces/lang-config.interface';
import { ILanguagesItem } from '../interfaces/languages-item.interface';

export function langServiceInitializeApp(langService: LangService) {
  return () => langService.initializeApp();
}
@Injectable()
export class LangService {
  get languages() {
    if (!this.languages$.getValue()) {
      return this._langConfig.languages;
    }
    return this.languages$.getValue();
  }
  set languages(langs: ILanguagesItem[]) {
    this.languages$.next(langs);
  }
  get current() {
    if (!this.current$.getValue()) {
      return this._langConfig.defaultLang;
    }
    return this.current$.getValue();
  }
  set current(value: string) {
    if (!value) {
      this._translateService.use(value);
      this._storage.removeItem(this._langConfig.storageKeyName).then(_ => {
        this.current$.next(value);
      });
    } else {
      this._translateService.use(value);
      this._storage.setItem(this._langConfig.storageKeyName, value).then(_ => {
        this.current$.next(value);
      });
    }
  }
  current$ = new BehaviorSubject<string>(undefined);
  languages$ = new BehaviorSubject<ILanguagesItem[]>([]);

  constructor(
    @Inject(LANG_CONFIG_TOKEN) private _langConfig: ILangConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
    private _translateService: TranslateService
  ) {}
  async initLanguages() {
    this._translateService.setDefaultLang(this._langConfig.appLang);
    this._translateService.addLangs(this._langConfig.languages.map((lang: ILanguagesItem) => lang.code));
    this._langConfig.languages.map(lang => {
      let translations = {};
      lang.translations.map(translation => (translations = { ...translations, ...translation }));
      this._translateService.setTranslation(lang.code, translations);
    });
    return this._langConfig.languages;
  }
  initCurrent() {
    return new Promise((resolve, reject) => {
      this._storage.getItem(this._langConfig.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          resolve(data);
        } else {
          resolve(this.current);
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initLanguages().then(languages => {
        this.languages = languages;
        this.initCurrent().then(value => {
          this.current = value as string;
          resolve();
        });
      });
    });
  }
}
