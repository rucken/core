import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Permission } from './models/permission.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class PermissionsService extends RepositoryService {
  public items$: Subject<Permission[]>;
  public items: Permission[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'permissions';
    this.mame = 'permission';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Permission[]>>new Subject();
  }
  transformModel(item: any) {
    return new Permission(item);
  }
  newCache() {
    return new PermissionsService(this.httpHelper, this.endpointHelper);
  }
}
