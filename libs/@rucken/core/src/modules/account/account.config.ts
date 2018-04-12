import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { User } from '../../shared/models/user';
import { TokenService } from '../token/token.service';

@Injectable()
export class AccountConfig implements IRestProviderOptions<any> {
  pluralName = 'account';
  autoload = false;
  actionOptions = {
    requestOptions: (key: number | string, data: any, action: ProviderActionEnum) => {
      let headers = { 'Content-Type': 'application/json' };
      if (key === 'update') {
        headers = { ...headers, ...this._tokenService.getHeader() };
      }
      return { headers: headers, withCredentials: false };
    },
    responseData: (data: any, action: ProviderActionEnum) => {
      return { token: data.body.token, user: plainToClass(User, data.body.user) };
    }
  };
  constructor(
    private _tokenService: TokenService
  ) {
  }
}
