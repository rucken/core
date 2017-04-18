import { ResourceModel } from './resource.model';
import { Permission } from './permission.model';
import * as _ from 'lodash';

export class Group extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    name: 'Name',//translate
    permissions: 'Permissions'//translate
  };
  static fields: any = ['id', 'name', 'permissions'];

  id: number;
  name: string;
  permissions: Permission[];

  constructor(obj?: any) {
    super(obj);
  }
  static meta(): any {
    let meta: any = Group;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, Group.meta());
    this.permissions = obj.permissions && obj.permissions.length ?
      obj.permissions.map((permission: any) => new Permission(permission)) : [];
  }
  format() {
    let result = this.formatByFields(Group.meta());
    result.permissions = result.permissions && result.permissions.length ?
      result.permissions.map((permission: Permission) => permission.pk) : [];
    return result;
  }
  checkPermissions(permissionNames: string[]) {
    let result = this.permissions && this.permissions.filter(
      permission => permissionNames.filter(
        permissionName => _.camelCase(permission.codename).toLowerCase() === _.camelCase(permissionName).toLowerCase()
      ).length > 0
    ).length > 0;
    if (!result) {
      permissionNames = permissionNames.map(permissionName => {
        return permissionName
          .replace(permissionName.split('_')[0], 'manage');
      });
      return this.permissions && this.permissions.filter(
        permission => permissionNames.filter(
          permissionName => _.camelCase(permission.codename).toLowerCase() === _.camelCase(permissionName).toLowerCase()
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
