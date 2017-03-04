import { ResourceModel } from './resource.model';

export class Theme extends ResourceModel {
  static titles: any = {
    url: 'Url',//translate
    name: 'Name'//translate
  };
  static fields: any = ['url', 'name'];
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
    this.parseByFields(obj, Theme.meta);
  }
  format() {
    return this.formatByFields(Theme.meta);
  }
}
