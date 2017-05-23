import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel, EndpointHelper, HttpHelper } from './../../../../../../src';
import * as _ from 'lodash';
import { environment } from './../../../../environments/environment';

@Injectable()
export class DemoEndpointHelper extends EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  get apiUrl() {
    return environment.apiUrl;
  }
  actionRequest(endpointService: any, action?: any, data?: any): Observable<Response> {
    if (endpointService.name === 'account') {
      const url = this.actionUrl(endpointService, action).replace('account/', 'account-');
      if (action === 'info') {
        return this.httpHelper.http.get(url);
      }
      if (action === 'login') {
        return this.httpHelper.http.get(url, data);
      }
      return this.httpHelper.http.post(url, data);
    }
    return super.actionRequest(endpointService, action, data);
  };
}
