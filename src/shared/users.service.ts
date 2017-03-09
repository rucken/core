import { RepositoryService } from '../shared/repository.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { RepositoryHelper } from './helpers/repository.helper';
@Injectable()
export class UsersService extends RepositoryService {
  public items$: Subject<User[]>;
  public items: User[];
  public apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'users';
    this.name = 'user';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<User[]>>new Subject();
  }
  transformModel(item: any) {
    return new User(item);
  }
  newCache() {
    return new UsersService(this.repositoryHelper);
  }
}
