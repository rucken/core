import { Permission } from './permission.model';
import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { Group } from './group.model';
import { translate } from './../utils';

export class GroupPermission extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    group: translate('Group'),
    permission: translate('Permission'),
  };
  static fields: any = ['id', 'group', 'permission'];

  className = 'GroupPermission';

  id: number;
  group: Group;
  permission: Permission;

  static meta(): any {
    const meta: any = GroupPermission;
    meta.group = Group;
    meta.permission = Permission;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, GroupPermission.meta());
  }
  format() {
    const result = this.formatByFields(GroupPermission.meta());
    return result;
  }
  get asString() {
    return this.permissionAsString;
  }
  get permissionAsString() {
    if (this.permission) {
      return this.permission.asString;
    } else {
      return '';
    }
  }
}
