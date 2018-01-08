import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { Permission } from './../models/permission.model';

@Injectable()
export class PermissionsService extends BaseRepositoryService {
  items$: Subject<Permission[]>;
  items: Permission[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'permissions';
    this.name = 'permission';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = new Subject<Permission[]>();
  }
  transformModel(item: any) {
    return new Permission(item);
  }
  newCache() {
    return new PermissionsService(this.injector);
  }
}
