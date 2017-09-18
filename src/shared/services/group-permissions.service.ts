import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { GroupPermission } from './../models/group-permission.model';
import { BaseRepositoryService } from './../../base/base-services/base-repository.service';
import { RepositoryHelper } from './../helpers/repository.helper';
@Injectable()
export class GroupPermissionsService extends BaseRepositoryService {
  items$: Subject<GroupPermission[]>;
  items: GroupPermission[];
  apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'group_permissions';
    this.name = 'group_permission';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<GroupPermission[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new GroupPermission(item);
  }
  newCache() {
    return new GroupPermissionsService(this.repositoryHelper);
  }
}
