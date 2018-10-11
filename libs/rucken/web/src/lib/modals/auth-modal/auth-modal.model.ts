import { translate, EqualsToOtherProperty } from '@rucken/core';
import { IsNotEmpty, ValidateIf, Validate } from 'class-validator';
import { IModel } from 'ngx-repository';
import { AuthModalTypeEnum } from './auth-modal-type.enum';

export class AuthModalModel implements IModel {
  static strings = {
    email: translate('Email'),
    password: translate('Password'),
    rePassword: translate('Confirm password')
  };
  id: number = undefined;
  @IsNotEmpty({
    groups: [AuthModalTypeEnum.SignIn.toString(), AuthModalTypeEnum.SignUp.toString()]
  })
  email: string = undefined;
  @IsNotEmpty({
    groups: [AuthModalTypeEnum.SignIn.toString(), AuthModalTypeEnum.SignUp.toString()]
  })
  password: string = undefined;
  @Validate(EqualsToOtherProperty, ['password'], {
    groups: [AuthModalTypeEnum.SignUp.toString()]
  })
  @IsNotEmpty({
    groups: [AuthModalTypeEnum.SignUp.toString()]
  })
  rePassword: string = undefined;
}
