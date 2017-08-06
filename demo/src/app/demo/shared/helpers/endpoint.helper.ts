import { Injectable } from '@angular/core';
import { EndpointHelper, HttpHelper } from './../../../../../../src';
import { environment } from './../../../../environments/environment';

@Injectable()
export class DemoEndpointHelper extends EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  get apiUrl() {
    return environment.apiUrl;
  }
}
