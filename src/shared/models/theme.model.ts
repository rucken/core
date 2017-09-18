import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { translate } from './../utils/utils';

export class Theme extends BaseResourceModel {
  static titles: any = {
    url: translate('Url'),
    name: translate('Name')
  };

  static fields: any = ['url', 'name'];

  pkFieldName = 'url';
  pkIsNumber = false;

  url: string;
  name: string;

  static meta(): any {
    const meta: any = Theme;
    return meta;
  }

  constructor(obj?: any) {
    super(obj);
  }
}
