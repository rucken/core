import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { plainToClass, classToPlain } from 'class-transformer';
import { IAccountConfig } from './interfaces/account-config.interface';
import {
  ACCOUNT_CONFIG_TOKEN,
  defaultAccountConfig
} from './configs/account.config';
import { Inject } from '@angular/core';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_CONFIG_TOKEN) private accountConfig: IAccountConfig,
    private _httpClient: HttpClient
  ) {
    this.accountConfig = { ...defaultAccountConfig, ...this.accountConfig };
  }
  update(user: User): Observable<User> {
    return this._httpClient
      .post(
        this.accountConfig.apiUri + this.accountConfig.updateUri,
        classToPlain(user)
      )
      .pipe(map(data => plainToClass(User, data)));
  }
}
