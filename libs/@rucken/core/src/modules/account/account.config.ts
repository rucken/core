import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { User } from '../../shared/models/user';

@Injectable()
export class AccountConfig implements IRestProviderOptions<any> {
  pluralName = 'account';
  autoload = false;
  actionOptions = {
    responseData: (data: any, action: ProviderActionEnum) => {
      return { token: data.body.token, user: plainToClass(User, data.body.user) };
    }
  };
  constructor() { }
}
