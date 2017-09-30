import { BaseResourceModel } from './../base/models/base-resource.model';
import { Group } from './group.model';
import { translate } from './../utils/utils';

export class User extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    username: translate('Username'),
    password: translate('Password'),
    rePassword: translate('Repeat password'),
    usernameOrEmail: translate('Username/Email'),
    roles: translate('Roles'),
    rolesTitles: {
      isActive: translate('User'),
      isStaff: translate('Staff'),
      isSuperuser: translate('Administrator')
    },
    isSuperuser: translate('Administrator'),
    isStaff: translate('Staff'),
    isActive: translate('User'),
    asString: translate('Full name'),
    firstName: translate('First name'),
    lastName: translate('Last name'),
    email: translate('Email'),
    lastLogin: translate('Last login'),
    dateJoined: translate('Date joined'),
    groups: translate('Groups'),
    dateOfBirth: translate('Date of birth'),
  };
  static dateFields: any = ['lastLogin', 'dateJoined', 'dateOfBirth'];
  static fields: any = ['id', 'username', 'password', 'isSuperuser',
    'isStaff', 'isActive', 'firstName', 'lastName', 'email',
    'lastLogin', 'dateJoined', 'groups', 'dateOfBirth'];

  id: number;
  username: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
  email: string;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
  lastLogin: Date;
  dateJoined: Date;
  groups: Group[];
  dateOfBirth: Date;

  static meta(): any {
    const meta: any = User;
    meta.group = Group;
    return meta;
  }
  constructor(obj?: any) {
    super(obj);
  }
  get roles(): any {
    return { isActive: this.isActive, isStaff: this.isStaff, isSuperuser: this.isSuperuser };
  }
  set roles(roles: any) {
    this.isActive = roles['isActive'];
    this.isStaff = roles['isStaff'];
    this.isSuperuser = roles['isSuperuser'];
  }
  parse(obj: any) {
    this.parseByFields(obj, User.meta());
    this.groups = obj.groups && obj.groups.length ?
      obj.groups.map((group: any) => new Group(group)) : [];
    this.rePassword = this.password;
  }
  validate() {
    const result: any = {};
    let valid = true;
    if (this.password !== undefined && this.password !== this.rePassword) {
      result.rePassword = [translate('Password does not match the repeat password')];
      valid = false;
    }
    if (valid === true) {
      return valid;
    }
    return result;
  }
  format() {
    const result = this.formatByFields(User.meta());
    result.groups = result.groups && result.groups.length ?
      result.groups.map((group: Group) => group.pk) : [];
    return result;
  }
  get asString() {
    const arr: string[] = [];
    if (this.firstName) {
      arr.push(this.firstName);
    }
    if (this.lastName) {
      arr.push(this.lastName);
    }
    if (arr.length === 0 && this.username) {
      arr.push(this.username);
    }
    return arr.join(' ');
  }
  checkRoles(rolesName: string[]) {
    return rolesName.filter(roleName => this.checkRole(roleName)).length > 0;
  }
  checkRole(roleName: string) {
    if (this.isActive) {
      if (roleName.toLowerCase() === 'admin' && this.isSuperuser) {
        return true;
      }
      if (roleName.toLowerCase() === 'staff' && this.isStaff) {
        return true;
      }
      if (roleName.toLowerCase() === 'user') {
        return true;
      }
    } else {
      return false;
    }
  }
  checkPermissions(permissionNames: string[]) {
    if (this.checkRoles(permissionNames)) {
      return true;
    } else {
      return this.groups && this.groups.filter((group) =>
        group.checkPermissions(permissionNames)).length > 0;
    }
  }
  formatToAuth(): any {
    return {
      username: this.username,
      password: this.password
    };
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
      return this.groups.map((group: Group) => group.asString).join(', ');
    } else {
      return '';
    }
  }
  get dateOfBirthInput() {
    return this.getDateInput('dateOfBirth');
  }
  set dateOfBirthInput(text: string) {
    this.setDateInput('dateOfBirth', text);
  }
  get dateOfBirthAsString() {
    return this.dateAsString('dateOfBirth');
  }
}
