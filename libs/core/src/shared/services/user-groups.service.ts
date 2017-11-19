import { map} from 'rxjs/operators';

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { UserGroup } from './../models/user-group.model';

@Injectable()
export class UserGroupsService extends BaseRepositoryService {
  items$: Subject<UserGroup[]>;
  items: UserGroup[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'user_groups';
    this.name = 'user_group';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = new Subject<UserGroup[]>();
    this.meta.perPage = 10;
  }
  transformModel(item: any) {
    return new UserGroup(item);
  }
  newCache() {
    return new UserGroupsService(this.injector);
  }
}
