import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Permission } from './models/permission.model';
import { RepositoryService } from './repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class PermissionsService extends RepositoryService {
  public items$: Subject<Permission[]>;
  public items: Permission[];
  public apiUrl: string;

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
