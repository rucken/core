import { Permission } from './permission.model';
import { ResourceModel } from '../../shared/models/resource.model';
import { Group } from './group.model';

export class GroupPermission extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    group: 'Group',//translate
    permission: 'Permission',//translate
  };
  static fields: any = ['id', 'group', 'permission'];

  id: number;
  group: Group;
  permission: Permission;

  constructor(obj?: any) {
    super(obj);
  }
  static get meta(): any {
    let meta: any = GroupPermission;
    meta.group = Group;
    meta.permission = Permission;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, GroupPermission.meta);
  }
  format() {
    let result = this.formatByFields(GroupPermission.meta);
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
