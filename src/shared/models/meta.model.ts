import { ResourceModel } from './resource.model';
export class MetaModel extends ResourceModel {
  static titles: any = {
    totalResults: 'Total results',//translate
    curPage: 'Current page',//translate
    totalPages: 'Total pages',//translate
    perPage: 'Per page'//translate
  };
  static dateFields: string[] = [];

  totalResults: number;
  curPage: number;
  totalPages: number;
  perPage: number;

  constructor(obj?: any) {
    super(obj);
  }
  static get meta(): any {
    let meta: any = MetaModel;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, MetaModel.titles, MetaModel.dateFields);
  }
  format() {
    let result = this.formatByFields(MetaModel.titles, MetaModel.dateFields);
    return result;
  }
}
