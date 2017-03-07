import { RepositoryService } from '../shared/repository.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { HttpHelper } from '../shared/helpers/http.helper';
import { EndpointHelper } from '../shared/helpers/endpoint.helper';
@Injectable()
export class UsersService extends RepositoryService {
  public items$: Subject<User[]>;
  public items: User[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'users';
    this.mame = 'user';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<User[]>>new Subject();
  }
  transformModel(item: any) {
    return new User(item);
  }
  newCache() {
    return new UsersService(this.httpHelper, this.endpointHelper);
  }
}
