import { HttpHelper } from './../../../../../src';
import { Injectable, EventEmitter } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper, AccountService } from './../../../../../src';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';
import { User } from './../../../../../src';
@Injectable()
export class DemoAccountService extends AccountService {
  account$: Subject<User>;
  _account: User;
  constructor(public endpointHelper: EndpointHelper) {
    super(endpointHelper);
    this.apiUrl = `${endpointHelper.apiUrl}/${this.name}`;
    this.account$ = <Subject<User>>new Subject();
  }
}
