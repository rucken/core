import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IModel } from 'ngx-repository';
import {
  serializeModel,
  transformDateToString,
  transformStringToDate
} from '../../utils/custom-transforms';
import { translate } from '../../utils/translate';
import { Group } from './group';

export class User implements IModel {
  static strings = {
    id: translate('Id'),
    username: translate('Username'),
    password: translate('Password'),
    rePassword: translate('Repeat password'),
    roles: translate('Roles'),
    isSuperuser: translate('Administrator'),
    isStaff: translate('Staff'),
    isActive: translate('User'),
    fullName: translate('Full name'),
    firstName: translate('First name'),
    lastName: translate('Last name'),
    email: translate('Email'),
    lastLogin: translate('Last login'),
    dateJoined: translate('Date joined'),
    groups: translate('Groups'),
    dateOfBirth: translate('Date of birth'),
    createTitle: translate('Add new user'),
    updateTitle: translate('Update user #{{id}}'),
    deleteTitle: translate('Delete user #{{id}}'),
    deleteMessage: translate('Do you really want to delete user?'),
    selectTitle: translate('Select user')
  };
  // need for deep update if local change in any place
  static nested = {
    groups: Group
  };
  id: number = undefined;
  @IsNotEmpty()
  username: string = undefined;
  password: string = undefined;
  rePassword: string = undefined;
  firstName: string = undefined;
  lastName: string = undefined;
  @IsNotEmpty()
  @IsEmail(undefined)
  email: string = undefined;
  isSuperuser = false;
  isStaff = false;
  isActive = false;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  lastLogin: Date = undefined;
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  dateJoined: Date = undefined;
  @IsOptional()
  @Type(serializeModel(Group))
  groups: Group[] = [];
  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  dateOfBirth: Date = undefined;
  get permissionNames() {
    const permissions = [];
    if (this.groups) {
      this.groups.forEach(group =>
        group.permissions.forEach(permission =>
          permissions.push(permission.name)
        )
      );
    }
    return permissions;
  }
  toString() {
    return `${this.firstName} ${this.lastName} (${this.username})`.trim();
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
  get rolesAsString() {
    const roles: string[] = [];
    if (this.isActive) {
      if (this.isSuperuser) {
        roles.push('Admin');
      }
      if (this.isStaff) {
        roles.push('Staff');
      }
      roles.push('User');
    }
    return roles.reverse().join(', ');
  }
  get groupsAsString() {
    if (this.groups) {
      return this.groups.map((group: Group) => group).join(', ');
    } else {
      return '';
    }
  }
}
