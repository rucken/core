import { HttpHelper } from '../../../../../dist';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper, AccountService } from '../../../../../dist';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { User } from '../../../../../dist/shared/models/user.model';
@Injectable()
export class DemoAccountService extends AccountService {
  public account$: Subject<User>;
  public _account: User;
  constructor(public endpointHelper: EndpointHelper) {
    super(endpointHelper);
    this.apiUrl = `${endpointHelper.apiUrl}/${this.name}`;
    this.account$ = <Subject<User>>new Subject();
  }
  public info() {
    if (localStorage.getItem('token') === null) {
      return super.logout();
    }
    return super.info();
  }
  public logout() {
    localStorage.removeItem('token');
    return super.logout();
  }
}
