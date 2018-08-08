import { User } from '../../../shared/models/user';
import { serializeModel } from '../../../shared/utils/custom-transforms';
import { Type } from 'class-transformer';

export class UserTokenDto {
  token: string;
  @Type(serializeModel(User))
  user: User;
}
