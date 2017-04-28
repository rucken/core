import { ResourceModel } from './resource.model';
import { translate } from '../utils';

export class Theme extends ResourceModel {
  static titles: any = {
    url: translate('Url'),
    name: translate('Name')
  };

  static fields: any = ['url', 'name'];

  public _pkFieldName = 'url';
  public _pkIsNumber = false;

  public url: string;
  public name: string;

  static meta(): any {
    const meta: any = Theme;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, Theme.meta());
  }
  format() {
    return this.formatByFields(Theme.meta());
  }
}
