import { ResourceModel } from './resource.model';

export class ContentType extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    model: 'Model',//translate

  };

  id: number;
  model: string;

  constructor(obj?: any) {
    super(obj);
  }
  static get meta(): any {
    let meta: any = ContentType;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, ContentType.titles);
  }
  format() {
    let result = this.formatByFields(ContentType.titles);
    return result;
  }
  get asString() {
    return this.model;
  }
}
