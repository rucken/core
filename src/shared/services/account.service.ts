import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { EndpointHelper, AccountService } from '@rucken/core';

@Injectable()
export class WebAccountService extends AccountService {
  constructor(public endpointHelper: EndpointHelper) {
    super(endpointHelper);
  }
  get token() {
    return localStorage.getItem('token');
  }
  set token(value: string) {
    if (value === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
  }
}
