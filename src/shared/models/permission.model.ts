import { ResourceModel } from '../../shared/models/resource.model';
import { ContentType } from './content-type.model';

export class Permission extends ResourceModel {
  static titles: any = {
    id: 'Id',//translate
    contentType: 'Content type',//translate
    codename: 'Codename',//translate
    name: 'Name'//translate
  };

  id: number;
  contentType: ContentType;
  codename: string;
  name: string;

  constructor(obj?: any) {
    super(obj);
  }
  static get meta(): any {
    let meta: any = Permission;
    return meta;
  }
  parse(obj: any) {
    this.parseByFields(obj, Permission.titles);
    this.contentType = obj.contentType ? new ContentType(obj.contentType) : null;
  }
  format() {
    let result = this.formatByFields(Permission.titles);
    result.contentType = result.contentType ? result.contentType.pk : null;
    return result;
  }
  get asString() {
    return this.name;
  }
  get contentTypeAsString() {
    if (this.contentType) {
      return this.contentType.asString;
    } else {
      return '';
    }
  }
}
