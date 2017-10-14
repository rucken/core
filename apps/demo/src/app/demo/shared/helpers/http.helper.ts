import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHelper } from '@rucken/core';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../../../environments/environment';

@Injectable()
export class DemoHttpHelper extends HttpHelper {

  direct = environment.type === 'mockapi';

  constructor(public authHttp: AuthHttp, public http: Http) {
    super(authHttp, http);
  }
}
