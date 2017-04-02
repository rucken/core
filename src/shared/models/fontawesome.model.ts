import { ResourceModel } from './resource.model';

export class Fontawesome extends ResourceModel {
  static titles: any = {
    icon: 'Icon',//translate
    code: 'Code',//translate
    class: 'Class'//translate
  };
  static fields: any = ['code', 'class'];

  code: string;
  class: string;

  constructor(obj?: any) {
    super(obj, 'class', false);
  }
  static meta(): any {
    let meta: any = Fontawesome;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, Fontawesome.meta());
  }
  format() {
    let result = this.formatByFields(Fontawesome.meta());
    return result;
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
