import { Inject, Injectable } from '@angular/core';
import { BrowserCookiesService } from '../cookies/browser-cookies.service';

@Injectable()
export class LangStorage {

  storageKeyName = 'lang';

  get(): string {
    const lang = this._cookiesStorage.getItem(this.storageKeyName);
    if (lang) {
      return lang;
    }
    return undefined;
  }
  set(value?: string) {
    if (value === undefined) {
      this._cookiesStorage.removeItem(this.storageKeyName);
    } else {
      this._cookiesStorage.setItem(this.storageKeyName, value);
    }
  }
  constructor(
    private _cookiesStorage: BrowserCookiesService
  ) {
  }
}
