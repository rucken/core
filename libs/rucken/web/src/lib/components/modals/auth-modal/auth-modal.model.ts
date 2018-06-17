import { translate } from '@rucken/core';
import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';

export class AuthModalModel implements IModel {
  static strings = {
    username: translate('Username/Email'),
    password: translate('Password')
  };
  id: number = undefined;
  @IsNotEmpty()
  username: string = undefined;
  @IsNotEmpty()
  password: string = undefined;
}
