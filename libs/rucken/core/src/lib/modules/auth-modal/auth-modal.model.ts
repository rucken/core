import { IsNotEmpty, Validate } from 'class-validator';
import { IModel } from 'ngx-repository';
import { EqualsToOtherProperty } from '../../utils/custom-validators';
import { translate } from '../../utils/translate';
import { AuthModalTypeEnum } from './auth-modal-type.enum';

export class AuthModalModel implements IModel {
  static strings = {
    username: translate('Username'),
    email: translate('Email'),
    password: translate('Password'),
    rePassword: translate('Confirm password')
  };
  id: number = undefined;
  @IsNotEmpty({
    groups: [AuthModalTypeEnum.SignUp.toString()]
  })
  username: string = undefined;
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
