import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AccountService } from '@rucken/core';

@Injectable()
export class WebAccountService extends AccountService {

  get token(): string | null {
    return localStorage.getItem('token');
  }
  set token(value: string | null) {
    if (value === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
  }
}
