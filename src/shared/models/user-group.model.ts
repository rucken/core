import { ResourceModel } from '../../shared/models/resource.model';
import { User } from './user.model';
import { Group } from './group.model';

export class UserGroup extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    user: 'User',//translate
    group: 'Group',//translate

  };

  id: number;
  user: User;
  group: Group;

  constructor(obj?: any) {
    super(obj);
  }
  static get meta(): any {
    let meta: any = UserGroup;
    meta.user = User;
    meta.group = Group;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, UserGroup.titles);
  }
  format() {
    let result = this.formatByFields(UserGroup.titles);
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
