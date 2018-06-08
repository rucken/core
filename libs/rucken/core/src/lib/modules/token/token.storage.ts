import { Injectable, Inject } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';

@Injectable()
export class TokenStorage {

  headerName = 'Authorization';
  headerPrefix = 'JWT';
  tokenName = 'token';
  storageKeyName = 'token';

  get(): string {
    const token = this._cookies.getObject(this.storageKeyName) as string;
    if (token && token !== 'undefined') {
      return token;
    }
    return undefined;
  }
  set(token?: string) {
    if (!token) {
      this._cookies.remove(this.storageKeyName);
    } else {
      this._cookies.putObject(this.storageKeyName, token);
    }
  }
  constructor(
    private _cookies: CookiesService
  ) {
  }
}
