import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguagesItem } from '../interfaces/languages-item.interface';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { IStorage } from '../../storage/interfaces/storage.interface';
import { LANG_CONFIG_TOKEN } from '../configs/lang.config';
import { ILangConfig } from '../interfaces/lang-config.interface';

export function langServiceInitializeApp(langService: LangService) {
  return () => langService.initializeApp();
}
@Injectable()
export class LangService {
  get languages() {
    return this._langConfig.languages;
  }
  get current() {
    if (!this.current$.getValue()) {
      return this._langConfig.defaultLang;
    }
    return this.current$.getValue();
  }
  set current(value: string) {
    if (!value) {
      this._cookies.removeItem(this._langConfig.storageKeyName);
    } else {
      this._cookies.setItem(this._langConfig.storageKeyName, value);
    }
    this._translateService.use(value);
    this.current$.next(value);
  }
  current$ = new BehaviorSubject<string>(undefined);

  constructor(
    @Inject(LANG_CONFIG_TOKEN) private _langConfig: ILangConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _cookies: IStorage,
    private _translateService: TranslateService
  ) {
    this._translateService.setDefaultLang(this._langConfig.appLang);
    this._translateService.addLangs(
      this._langConfig.languages.map((lang: ILanguagesItem) => lang.code)
    );
    this._langConfig.languages.map(lang => {
      let translations = {};
      lang.translations.map(
        translation => (translations = { ...translations, ...translation })
      );
      this._translateService.setTranslation(lang.code, translations);
    });
  }
  async initCurrent() {
    const data = await this._cookies.getItem(
      this._langConfig.storageKeyName
    ) as string;
    if (data && data !== 'undefined') {
      return data;
    }
    return this.current;
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.current = value;
        resolve();
      });
    });
  }
}
