import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';
import { serializeModel } from '../../utils/custom-transforms';
import { translate } from '../../utils/translate';
import { Permission } from './permission';

export class Group implements IModel {
  static strings = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
    permissions: translate('Permissions'),
    createTitle: translate('Add new group'),
    viewTitle: translate('Group #{{id}}'),
    updateTitle: translate('Update group #{{id}}'),
    deleteTitle: translate('Delete group #{{id}}'),
    deleteMessage: translate('Do you really want to delete group?'),
    selectTitle: translate('Select group')
  };
  // need for deep update if local change in any place
  static nested = {
    permissions: Permission
  };
  id: number = undefined;
  @IsNotEmpty()
  name: string = undefined;
  title: string = undefined;
  @Type(serializeModel(Permission))
  permissions: Permission[] = [];
  get permissionsAsString() {
    if (this.permissions) {
      const permissionsLength = this.permissions.length;
      if (permissionsLength > 14) {
        return (
          this.permissions.filter((item, index) => index < 7).join(', ') +
          (permissionsLength > 7 ? `... +${permissionsLength - 7}` : '')
        );
      }
      return this.permissions.join(', ');
    } else {
      return '';
    }
  }
  toString() {
    return this.title;
  }
}
