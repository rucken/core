import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguagesItem } from '../interfaces/languages-item.inteface';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { LANG_CONFIG_TOKEN, defaultLangConfig } from '../configs/lang.config';
import { ILangConfig } from '../interfaces/lang-config.interface';
import { IStorage } from '../../storage/interfaces/storage.interface';

@Injectable()
export class LangService {
  get languages() {
    return this._langConfig.languages;
  }
  get current() {
    const lang = this._cookies.getItem(
      this._langConfig.storageKeyName
    ) as string;
    if (lang && lang !== 'undefined') {
      return lang;
    }
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
    console.log(this._langConfig);
    this._translateService.setDefaultLang(this._langConfig.appLang);
    this._translateService.addLangs(
      this._langConfig.languages.map(lang => lang.code)
    );
    this._langConfig.languages.map(lang => {
      let translations = {};
      lang.translations.map(
        translation => (translations = { ...translations, ...translation })
      );
      this._translateService.setTranslation(lang.code, translations);
    });
    this._translateService.onLangChange.subscribe(event => {
      this.current = event.lang;
    });
    this.current = this.current;
  }
}
