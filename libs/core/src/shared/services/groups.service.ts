import { map } from 'rxjs/operators';

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { Group } from './../models/group.model';

@Injectable()
export class GroupsService extends BaseRepositoryService {
  items$: Subject<Group[]>;
  items: Group[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'groups';
    this.name = 'group';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = new Subject<Group[]>();
  }
  transformModel(item: any) {
    return new Group(item);
  }
  newCache() {
    return new GroupsService(this.injector);
  }
}
