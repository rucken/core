import { Injectable, Inject } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from '../../shared/models/user';
import { BrowserCookiesService } from '../cookies/browser-cookies.service';

@Injectable()
export class AccountStorage {

  storageKeyName = 'account';

  get(): User {
    const account = this._cookiesStorage.getItem(this.storageKeyName);
    if (account) {
      return plainToClass(User, JSON.parse(account) as Object);
    }
    return undefined;
  }
  set(user?: User) {
    if (user === undefined) {
      this._cookiesStorage.removeItem(this.storageKeyName);
      this._permissionsService.flushPermissions();
    } else {
      this._cookiesStorage.setItem(this.storageKeyName, JSON.stringify(
        classToPlain(user)
      ));
      this._permissionsService.loadPermissions(
        user.permissionNames
      );
    }
  }
  constructor(
    private _permissionsService: NgxPermissionsService,
    private _cookiesStorage: BrowserCookiesService
  ) {
  }
}
