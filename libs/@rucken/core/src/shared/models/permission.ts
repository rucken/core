import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IModel } from 'ngx-repository';
import { serializeModel, transformStringToObject } from '../utils/custom-transforms';
import { translate } from '../utils/translate';
import { ContentType } from './content-type';

export class Permission implements IModel {
  static strings = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
    contentType: translate('Content type'),
    createTitle: translate('Add new permission'),
    viewTitle: translate('Permission #{{id}}'),
    updateTitle: translate('Update permission #{{id}}'),
    deleteTitle: translate('Delete permission #{{id}}'),
    deleteMessage: translate('Do you really want to delete permission?')
  };
  id: number = undefined;
  @IsNotEmpty()
  name: string = undefined;
  title: string = undefined;
  @Type(serializeModel(ContentType))
  @Transform(transformStringToObject, { toPlainOnly: true })
  contentType: ContentType = undefined;
  get contentTypeAsString() {
    if (this.contentType) {
      return this.contentType;
    }
    return undefined;
  }
  toString() {
    return this.title;
  }
}
