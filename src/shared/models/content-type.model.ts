import { ResourceModel } from './resource.model';
import { translate } from '../utils';

export class ContentType extends ResourceModel {
  static titles: any = {
    id: translate('Id'),
    model: translate('Model'),

  };
  static fields: any = ['id', 'model'];

  id: number;
  model: string;

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
