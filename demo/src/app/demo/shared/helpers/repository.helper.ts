import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel, EndpointHelper, RepositoryHelper, HttpHelper } from './../../../../../../src';
import * as _ from 'lodash';
import { environment } from './../../../../environments/environment';

@Injectable()
export class DemoRepositoryHelper extends RepositoryHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  get apiUrl() {
    return environment.apiUrl;
  }
}
