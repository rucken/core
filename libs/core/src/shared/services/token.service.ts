import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { IBaseService } from '../base/interfaces/base-service.interface';

@Injectable()
export class TokenService implements IBaseService {

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
