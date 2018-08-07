import { translate } from '@rucken/core';
import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';

export class AuthModalModel implements IModel {
  static strings = {
    email: translate('Email'),
    password: translate('Password')
  };
  id: number = undefined;
  @IsNotEmpty()
  email: string = undefined;
  @IsNotEmpty()
  password: string = undefined;
}
