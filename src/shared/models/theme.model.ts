import { ResourceModel } from './resource.model';

export class Theme extends ResourceModel {
  static titles: any = {
    url: 'Url',//translate
    name: 'Name'//translate
  };
  url: string;
  name: string;
  constructor(obj?: any) {
    super(obj, 'url', false);
  }
  static get meta(): any {
    let meta: any = Theme;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, Theme.titles);
  }
  validate() {
    let result: any = {};
    let valid: boolean = true;
    if (valid === true) {
      return valid;
    }
    return result;
  }
  format() {
    return this.formatByFields(Theme.titles);
  }
}
