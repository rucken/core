import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { UserGroup } from './models/user-group.model';
import { RepositoryService } from './repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class UserGroupsService extends RepositoryService {
  public items$: Subject<UserGroup[]>;
  public items: UserGroup[];
  public apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'user_groups';
    this.name = 'user_group';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<UserGroup[]>>new Subject();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new UserGroup(item);
  }
  newCache() {
    return new UserGroupsService(this.repositoryHelper);
  }
}
