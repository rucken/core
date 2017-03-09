import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Group } from './models/group.model';
import { RepositoryService } from './repository.service';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class GroupsService extends RepositoryService {
  public items$: Subject<Group[]>;
  public items: Group[];
  public apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'groups';
    this.name = 'group';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Group[]>>new Subject();
  }
  transformModel(item: any) {
    return new Group(item);
  }
  newCache() {
    return new GroupsService(this.repositoryHelper);
  }
}
