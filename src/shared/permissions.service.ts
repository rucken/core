import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Permission } from './models/permission.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { ResponseService } from './response.service';
@Injectable()
export class PermissionsService extends ResourceService {
  public items$: Subject<Permission[]>;
  public items: Permission[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'permissions';
    this.resourceName = 'permission';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<Permission[]>>new Subject();
  }
  transformModel(item: any) {
    return new Permission(item);
  }
  newCache() {
    return new PermissionsService(this.http, this.response);
  }
}
