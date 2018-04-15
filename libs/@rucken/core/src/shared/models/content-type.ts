import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';
import { translate } from '../utils/translate';

export class ContentType implements IModel {
  static strings = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
    createTitle: translate('Add new content type'),
    viewTitle: translate('Content type #{{id}}'),
    updateTitle: translate('Update content type #{{id}}'),
    deleteTitle: translate('Delete content type #{{id}}'),
    deleteMessage: translate('Do you really want to delete content type?')
  };
  id: number = undefined;
  @IsNotEmpty()
  name: string = undefined;
  title: string = undefined;
  toString() {
    return this.title;
  }
}
