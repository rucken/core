import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { User } from './user.model';
import { Group } from './group.model';
import { translate } from './../utils';

export class UserGroup extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    user: translate('User'),
    group: translate('Group')
  };
  static fields: any = ['id', 'user', 'group'];

  className = 'UserGroup';

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
