import { ResourceModel } from '../../shared/models/resource.model';
import { ContentType } from './content-type.model';
import { translate } from '../utils';

export class Permission extends ResourceModel {
  static titles: any = {
    id: translate('Id'),
    contentType: translate('Content type'),
    codename: translate('Codename'),
    name: translate('Name')
  };
  static fields: any = ['id', 'contentType', 'codename', 'name'];

  id: number;
  contentType: ContentType;
  codename: string;
  name: string;

  static meta(): any {
    const meta: any = Permission;
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
    return this.name;
  }
  get contentTypeAsString() {
    if (this.contentType) {
      return this.contentType.asString;
    } else {
      return '';
    }
  }
}
