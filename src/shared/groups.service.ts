import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Group } from './models/group.model';
import { ResourceService } from './resource.service';
import { HttpService } from './http.service';
import { ResponseService } from './response.service';
@Injectable()
export class GroupsService extends ResourceService {
  public items$: Subject<Group[]>;
  public items: Group[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'groups';
    this.resourceName = 'group';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<Group[]>>new Subject();
  }
  transformModel(item: any) {
    return new Group(item);
  }
  newCache() {
    return new GroupsService(this.http, this.response);
  }
}
