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
  actionUrl(endpointService: any, action?: any) {
    let endpointServiceApiUrl = endpointService.apiUrl;
    if (environment.type === 'mockapi' && endpointService.name === 'account') {
      endpointServiceApiUrl += '/1';
    }
    if (action === undefined) {
      return endpointServiceApiUrl;
    } else {
      return `${endpointServiceApiUrl}/${action}`;
    }
  };
}
