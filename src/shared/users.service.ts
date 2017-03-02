import { ResourceService } from '../shared/resource.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { HttpService } from '../shared/http.service';
import { ResponseService } from '../shared/response.service';
@Injectable()
export class UsersService extends ResourceService {
  public items$: Subject<User[]>;
  public items: User[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'users';
    this.resourceName = 'user';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<User[]>>new Subject();
  }
  transformModel(item: any) {
    return new User(item);
  }
  newCache() {
    return new UsersService(this.http, this.response);
  }
}
