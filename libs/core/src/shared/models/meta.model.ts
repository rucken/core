import { BaseResourceModel } from './../base/models/base-resource.model';
import { translate } from './../common/utils';

export class MetaModel extends BaseResourceModel {
  static titles: any = {
    totalResults: translate('Total results'),
    curPage: translate('Current page'),
    totalPages: translate('Total pages'),
    perPage: translate('Per page')
  };
  static fields: any = ['totalResults', 'curPage', 'totalPages', 'perPage'];

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
}
