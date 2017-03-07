import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Group } from './models/group.model';
import { RepositoryService } from './repository.service';
import { HttpHelper } from './helpers/http.helper';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class GroupsService extends RepositoryService {
  public items$: Subject<Group[]>;
  public items: Group[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'groups';
    this.mame = 'group';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Group[]>>new Subject();
  }
  transformModel(item: any) {
    return new Group(item);
  }
  newCache() {
    return new GroupsService(this.httpHelper, this.endpointHelper);
  }
}
