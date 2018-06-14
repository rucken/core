import { Injectable, Inject } from '@angular/core';
import { AppStorage } from '@rucken/core';

@Injectable()
export class LangStorage {

  storageKeyName = 'lang';

  get(): string {
    const lang = this._cookies.getItem(this.storageKeyName) as string;
    if (lang && lang !== 'undefined') {
      return lang;
    }
    return undefined;
  }
  set(value?: string) {
    if (!value) {
      this._cookies.removeItem(this.storageKeyName);
    } else {
      this._cookies.setItem(this.storageKeyName, value);
    }
  }
  constructor(
    @Inject(AppStorage) private _cookies: Storage
  ) {
  }
}
