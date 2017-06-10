import { BaseResourceModel } from './../../base/base-models/base-resource.model';
import { translate } from './../utils';

export class Fontawesome extends BaseResourceModel {
  static titles: any = {
    icon: translate('Icon'),
    code: translate('Code'),
    class: translate('Class')
  };
  static fields: any = ['code', 'class'];

  className = 'Fontawesome';
  pkFieldName = 'class';
  pkIsNumber = false;

  code: string;
  class: string;

  constructor(obj?: any) {
    super(obj);
  }
  get asString() {
    return this.class;
  }
  get iconAsHtml() {
    if (this.class) {
      return `<i class="${this.class}" aria-hidden="true"></i>`;
    } else {
      return null;
    }
  }
}
