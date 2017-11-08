import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AccountService } from '@rucken/core';

@Injectable()
export class WebAccountService extends AccountService {

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
