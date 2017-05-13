import { ResourceModel } from './resource.model';
import { translate } from '../utils';

export class MetaModel extends ResourceModel {
  static titles: any = {
    totalResults: translate('Total results'),
    curPage: translate('Current page'),
    totalPages: translate('Total pages'),
    perPage: translate('Per page')
  };
  static fields: any = ['totalResults', 'curPage', 'totalPages', 'perPage'];

  public className = 'MetaModel';

  totalResults: number;
  curPage: number;
  totalPages: number;
  perPage: number;

  static meta(): any {
    const meta: any = MetaModel;
    return meta;
  }
  constructor(obj?: any) {
    super(obj);
  }
  parse(obj: any) {
    this.parseByFields(obj, MetaModel.meta());
  }
  format() {
    const result = this.formatByFields(MetaModel.meta());
    return result;
  }
}
