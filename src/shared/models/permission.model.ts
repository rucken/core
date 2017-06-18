import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { ContentType } from './content-type.model';
import { translate } from './../utils';

export class Permission extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    contentType: translate('Content type'),
    title: translate('Title'),
    name: translate('Name')
  };
  static fields: any = ['id', 'contentType', 'title', 'name'];

  id: number;
  contentType: ContentType;
  title: string;
  name: string;

  static meta(): any {
    const meta: any = Permission;
    meta.contentType = ContentType;
    return meta;
  }
  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, Permission.meta());
    this.contentType = obj.contentType ? new ContentType(obj.contentType) : null;
  }
  format() {
    const result = this.formatByFields(Permission.meta());
    result.contentType = result.contentType ? result.contentType.pk : null;
    return result;
  }
  get asString() {
    return this.title;
  }
  get contentTypeAsString() {
    if (this.contentType) {
      return this.contentType.asString;
    } else {
      return '';
    }
  }
}
