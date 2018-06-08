import { Inject, Injectable } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';

@Injectable()
export class LangStorage {

  storageKeyName = 'lang';

  get(): string {
    const lang = this._cookies.getObject(this.storageKeyName) as string;
    if (lang && lang !== 'undefined') {
      return lang;
    }
    return undefined;
  }
  set(value?: string) {
    if (!value) {
      this._cookies.remove(this.storageKeyName);
    } else {
      this._cookies.putObject(this.storageKeyName, value);
    }
  }
  constructor(
    private _cookies: CookiesService
  ) {
  }
}
