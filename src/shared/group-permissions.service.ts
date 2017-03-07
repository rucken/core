import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { GroupPermission } from './models/group-permission.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class GroupPermissionsService extends RepositoryService {
  public items$: Subject<GroupPermission[]>;
  public items: GroupPermission[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'group_permissions';
    this.mame = 'group_permission';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<GroupPermission[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new GroupPermission(item);
  }
  newCache() {
    return new GroupPermissionsService(this.httpHelper, this.endpointHelper);
  }
}
