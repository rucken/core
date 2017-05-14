import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Permission } from './models/permission.model';
import { BaseRepositoryService } from './../base/base-services/base-repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class PermissionsService extends BaseRepositoryService {
  items$: Subject<Permission[]>;
  items: Permission[];
  apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'permissions';
    this.name = 'permission';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Permission[]>>new Subject();
  }
  transformModel(item: any) {
    return new Permission(item);
  }
  newCache() {
    return new PermissionsService(this.repositoryHelper);
  }
}
