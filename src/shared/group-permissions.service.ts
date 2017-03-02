import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { GroupPermission } from './models/group-permission.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { ResponseService } from './response.service';
@Injectable()
export class GroupPermissionsService extends ResourceService {
  public items$: Subject<GroupPermission[]>;
  public items: GroupPermission[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'group_permissions';
    this.resourceName = 'group_permission';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<GroupPermission[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new GroupPermission(item);
  }
  newCache() {
    return new GroupPermissionsService(this.http, this.response);
  }
}
