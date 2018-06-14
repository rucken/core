import { Inject, Injectable } from '@angular/core';
import { AppStorage } from '@rucken/core';

@Injectable()
export class TokenStorage {

  headerName = 'Authorization';
  headerPrefix = 'JWT';
  tokenName = 'token';
  storageKeyName = 'token';

  get(): string {
    const token = this._cookies.getItem(this.storageKeyName) as string;
    if (token && token !== 'undefined') {
      return token;
    }
    return undefined;
  }
  set(token?: string) {
    if (!token) {
      this._cookies.removeItem(this.storageKeyName);
    } else {
      this._cookies.setItem(this.storageKeyName, token);
    }
  }
  constructor(
    @Inject(AppStorage) private _cookies: Storage
  ) {
  }
}
