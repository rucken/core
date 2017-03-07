import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel, EndpointHelper } from '../../../../../../src';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DemoEndpointHelper extends EndpointHelper {
  get apiUrl() {
    return environment.apiUrl;
  }
}
