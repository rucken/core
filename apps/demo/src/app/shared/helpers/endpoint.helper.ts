import { Injectable } from '@angular/core';
import { EndpointHelper } from '@rucken/core';

import { environment } from './../../../environments/environment';

@Injectable()
export class DemoEndpointHelper extends EndpointHelper {

  get apiUrl() {
    return environment.apiUrl;
  }
  actionUrl(endpointService: any, action: any, data: any, customUrl: string | null) {
    let url: string = endpointService.apiUrl;
    if (customUrl) {
      url = customUrl;
    }
    if (environment.type === 'mockapi' && endpointService.name === 'account') {
      url += '/1';
    }
    if (action !== undefined && action !== null) {
      url = `${url}/${action}`;
    }
    if (data) {
      let key: string;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          url = url.replace(new RegExp(`{${key}}`, 'ig'), data[key]);
        }
      }
    }
    return url;
  }
}
