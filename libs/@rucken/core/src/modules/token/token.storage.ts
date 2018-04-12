import { Injectable, Inject } from '@angular/core';
import { BrowserCookiesService } from '../cookies/browser-cookies.service';

@Injectable()
export class TokenStorage {

  headerName = 'Authorization';
  headerPrefix = 'JWT';
  tokenName = 'token';
  storageKeyName = 'token';

  get(): string {
    const token = this._cookiesStorage.getItem(this.storageKeyName);
    if (token) {
      return token;
    }
    return undefined;
  }
  set(token?: string) {
    if (token === undefined) {
      this._cookiesStorage.removeItem(this.storageKeyName);
    } else {
      this._cookiesStorage.setItem(this.storageKeyName, token);
    }
  }
  constructor(
    private _cookiesStorage: BrowserCookiesService
  ) {
  }
}
