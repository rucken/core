import { ResourceModel } from './resource.model';
import { Group } from './group.model';

export class User extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    username: 'Username',//translate
    password: 'Password',//translate
    rePassword: 'Repeat password',//translate
    usernameOrEmail: 'Username/Email',//translate
    roles: 'Roles',//translate
    rolesTitles: {
      isActive: 'User',//translate
      isStaff: 'Staff',//translate
      isSuperuser: 'Administrator'//translate
    },
    isSuperuser: 'Administrator',//translate
    isStaff: 'Staff',//translate
    isActive: 'User',//translate
    asString: 'Full name',//translate
    firstName: 'First name',//translate
    lastName: 'Last name',//translate
    email: 'Email',//translate
    lastLogin: 'Last login',//translate
    dateJoined: 'Date joined',//translate
    groups: 'Groups'//translate
  };
  static dateFields: any = ['lastLogin', 'dateJoined'];
  static fields: any = ['id', 'username', 'password', 'isSuperuser',
    'isStaff', 'isActive', 'firstName', 'lastName', 'email',
    'lastLogin', 'dateJoined', 'groups'];
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

  constructor(obj?: any) {
    super(obj);
  }
  static meta(): any {
    let meta: any = User;
    meta.group = Group;
    return meta;
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
    let result: any = {};
    let valid: boolean = true;
    if (this.password !== undefined && this.password !== this.rePassword) {
      result.rePassword = ['Password does not match the repeat password'];
      valid = false;
    }
    if (valid === true) {
      return valid;
    }
    return result;
  }
  format() {
    let result = this.formatByFields(User.meta());
    result.groups = result.groups && result.groups.length ?
      result.groups.map((group: Group) => group.pk) : [];
    return result;
  }
  get asString() {
    let arr: string[] = [];
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
    if (permissionNames.indexOf('admin') === -1) {
      permissionNames.push('admin');
    }
    if (this.checkRoles(permissionNames)) {
      return true;
    } else {
      return this.groups && this.groups.filter((group) =>
        group.checkPermissions(permissionNames)).length > 0;
    }
  }
  get rolesAsString() {
    let roles: string[] = [];
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
  get AsLoginUser(): any {
    return {
      username: this.username,
      password: this.password
    };
  }
}
