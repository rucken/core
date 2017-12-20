import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  [key: string]: any;

  headerName = 'Authorization';
  headerPrefix = 'JWT';
  tokenName = 'token';

  get(): string | null {
    // you custom code in extended class
    return null;
  }

  set(value: string | null) {
    // you custom code in extended class
  }
}
