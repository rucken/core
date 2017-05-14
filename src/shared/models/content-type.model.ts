import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { translate } from './../utils';

export class ContentType extends BaseResourceModel {
  static titles: any = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
  };
  static fields: any = ['id', 'name', 'title'];

  className = 'ContentType';

  id: number;
  name: string;
  title: string;

  static meta(): any {
    const meta: any = ContentType;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, ContentType.meta());
  }
  format() {
    const result = this.formatByFields(ContentType.meta());
    return result;
  }
  get asString() {
    return this.title;
  }
}
