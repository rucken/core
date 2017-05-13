import { ResourceModel } from '../../shared/models/resource.model';
import { User } from './user.model';
import { Group } from './group.model';
import { translate } from '../utils';

export class UserGroup extends ResourceModel {
  static titles: any = {
    id: translate('Id'),
    user: translate('User'),
    group: translate('Group')
  };
  static fields: any = ['id', 'user', 'group'];

  public className = 'UserGroup';

  id: number;
  user: User;
  group: Group;

  static meta(): any {
    const meta: any = UserGroup;
    meta.user = User;
    meta.group = Group;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, UserGroup.meta());
  }
  format() {
    const result = this.formatByFields(UserGroup.meta());
    return result;
  }
  get asString() {
    return this.groupAsString;
  }
  get groupAsString() {
    if (this.group) {
      return this.group.asString;
    } else {
      return '';
    }
  }
}
