import { ResourceModel } from './resource.model';
import { Permission } from './permission.model';
import * as _ from 'lodash';
import { translate } from '../utils';

export class Group extends ResourceModel {
  static titles: any = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
    permissions: translate('Permissions')
  };
  static fields: any = ['id', 'name', 'title', 'permissions'];

  public className = 'Group';

  id: number;
  name: string;
  title: string;
  permissions: Permission[];

  static meta(): any {
    const meta: any = Group;
    return meta;
  }
  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, Group.meta());
    this.permissions = obj.permissions && obj.permissions.length ?
      obj.permissions.map((permission: any) => new Permission(permission)) : [];
  }
  format() {
    const result = this.formatByFields(Group.meta());
    result.permissions = result.permissions && result.permissions.length ?
      result.permissions.map((permission: Permission) => permission.pk) : [];
    return result;
  }
  checkPermissions(permissionNames: string[]) {
    const result = this.permissions && this.permissions.filter(
      permission => permissionNames.filter(
        permissionName => _.camelCase(permission.name).toLowerCase() === _.camelCase(permissionName).toLowerCase()
      ).length > 0
    ).length > 0;
    if (!result) {
      permissionNames = permissionNames.map(permissionName => {
        return permissionName
          .replace(permissionName.split('_')[0], 'manage');
      });
      return this.permissions && this.permissions.filter(
        permission => permissionNames.filter(
          permissionName => _.camelCase(permission.name).toLowerCase() === _.camelCase(permissionName).toLowerCase()
        ).length > 0
      ).length > 0;
    } else {
      return result;
    }
  }
  get asString() {
    return this.name;
  }
  get permissionsAsString() {
    if (this.permissions) {
      return this.permissions.map((permission: Permission) => permission.asString).join(', ');
    } else {
      return '';
    }
  }
}
