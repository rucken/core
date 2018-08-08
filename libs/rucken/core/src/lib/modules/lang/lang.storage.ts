import { Inject, Injectable } from '@angular/core';
import { Storage } from '../for-storage/storage';
import { AppStorage } from '../for-storage/universal.inject';
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
  constructor(@Inject(AppStorage) private _cookies: Storage) {}
}
