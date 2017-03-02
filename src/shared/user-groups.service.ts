import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { UserGroup } from './models/user-group.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { ResponseService } from './response.service';
@Injectable()
export class UserGroupsService extends ResourceService {
  public items$: Subject<UserGroup[]>;
  public items: UserGroup[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'user_groups';
    this.resourceName = 'user_group';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<UserGroup[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new UserGroup(item);
  }
  newCache() {
    return new UserGroupsService(this.http, this.response);
  }
}
