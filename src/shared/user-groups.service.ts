import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { UserGroup } from './models/user-group.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class UserGroupsService extends RepositoryService {
  public items$: Subject<UserGroup[]>;
  public items: UserGroup[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'user_groups';
    this.mame = 'user_group';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<UserGroup[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new UserGroup(item);
  }
  newCache() {
    return new UserGroupsService(this.httpHelper, this.endpointHelper);
  }
}
