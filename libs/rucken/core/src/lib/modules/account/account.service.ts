import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../entities/models/user';
import { ACCOUNT_CONFIG_TOKEN } from './configs/account.config';
import { IAccountConfig } from './interfaces/account-config.interface';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_CONFIG_TOKEN) private accountConfig: IAccountConfig,
    private _httpClient: HttpClient
  ) { }
  update(user: User): Observable<User> {
    return this._httpClient
      .post(
        this.accountConfig.apiUri + this.accountConfig.updateUri,
        classToPlain(user)
      )
      .pipe(map(data => plainToClass(User, data)));
  }
}
