import 'rxjs/add/operator/map';

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { GroupPermission } from './../models/group-permission.model';

@Injectable()
export class GroupPermissionsService extends BaseRepositoryService {
  items$: Subject<GroupPermission[]>;
  items: GroupPermission[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'group_permissions';
    this.name = 'group_permission';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<GroupPermission[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new GroupPermission(item);
  }
  newCache() {
    return new GroupPermissionsService(this.injector);
  }
}
