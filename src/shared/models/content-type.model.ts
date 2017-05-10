import { ResourceModel } from './resource.model';
import { translate } from '../utils';

export class ContentType extends ResourceModel {
  static titles: any = {
    id: translate('Id'),
    name: translate('Name'),
    title: translate('Title'),
  };
  static fields: any = ['id', 'name', 'title'];

  public className = 'ContentType';

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
    return this.model;
  }
}
