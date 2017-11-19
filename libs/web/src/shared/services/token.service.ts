import { map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { TokenService } from '@rucken/core';

@Injectable()
export class WebTokenService extends TokenService {

  get(): string | null {
    return localStorage.getItem('token');
  }

  set(value: string | null) {
    if (value === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
  }
}
