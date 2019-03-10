import { Type } from 'class-transformer';
import { User } from '../../../models/user';
import { serializeModel } from '../../../utils/custom-transforms';

export class UserTokenDto {
  token: string;
  @Type(serializeModel(User))
  user: User;
}
