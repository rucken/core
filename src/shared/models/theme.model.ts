import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { translate } from './../utils';

export class Theme extends BaseResourceModel {
  static titles: any = {
    url: translate('Url'),
    name: translate('Name')
  };

  static fields: any = ['url', 'name'];

  className = 'Theme';
  pkFieldName = 'url';
  pkIsNumber = false;

  url: string;
  name: string;

  constructor(obj?: any) {
    super(obj);
  }
}
