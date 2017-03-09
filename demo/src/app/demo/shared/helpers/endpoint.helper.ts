import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel, EndpointHelper, HttpHelper } from '../../../../../../dist';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DemoEndpointHelper extends EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  get apiUrl() {
    return environment.apiUrl;
  }
  actionRequest(endpointService: any, action?: any, data?: any): Observable<Response> {
    if (environment.production) {
      if (endpointService.name === 'account') {
        if (action === 'info') {
          return this.httpHelper.authHttp.get(this.actionUrl(endpointService, action).
            replace('account/', 'account-'));
        }
        if (action === 'update') {
          return this.httpHelper.get(this.actionUrl(endpointService).
            replace('account/', 'account-'));
        }
      }
      return this.httpHelper.get(this.actionUrl(endpointService, action).
        replace('account/', 'account-'));
    }
    return super.actionRequest(endpointService, action, data);
  };
}
