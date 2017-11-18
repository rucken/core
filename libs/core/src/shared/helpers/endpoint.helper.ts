import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { isJson, translate } from './../common/utils';
import { HttpHelper } from './http.helper';

@Injectable()
export class EndpointHelper {
  httpHelper: HttpHelper;

  constructor(
    public injector: Injector
  ) {
    this.httpHelper = injector.get(HttpHelper);
  }
  get apiUrl() {
    return '/api';
  }
  get mockApiUrl() {
    return '/api';
  }
  actionUrl(endpointService: any, action: any, data: any, customUrl?: string) {
    let url: string = endpointService.apiUrl;
    if (customUrl) {
      url = customUrl;
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
  actionRequest(endpointService: any, action?: any, data?: any, direct?: boolean): Observable<Response> {
    return this.httpHelper.post(this.actionUrl(endpointService, action, null), this.actionRequestBody(endpointService, action, data));
  }
  actionRequestBody(endpointService: any, action?: any, data?: any) {
    if (!data) {
      data = {};
    }
    if (data.format !== undefined) {
      data = data.format();
    }
    return data;
  }
  actionResponse(endpointService: any, action?: any, response?: Response) {
    let data: any;
    if (response.json && _.isFunction(response.json)) {
      data = response.json();
    } else {
      data = response;
    }
    return data;
  }
  extractError(error: any, message?: string): any {
    if (message === undefined) {
      message = translate('Unknown error');
    }
    if (!error._body || !isJson(error._body) || error.type === 'error') {
      console.log(error);
      return { message: [error.statusText ? error.statusText : message] };
    } else {
      const errorBody = error.json && _.isFunction(error.json) ? error.json() : error;
      if (_.isString(errorBody)) {
        return { message: [errorBody] };
      }
      if (errorBody.description !== undefined) {
        return { message: [errorBody.description] };
      }
      if (errorBody.message !== undefined) {
        return { message: [errorBody.message] };
      }
      if (errorBody.errors !== undefined) {
        return { message: [errorBody.errors] };
      }
      if (errorBody.detail !== undefined) {
        return { message: [errorBody.detail] };
      }
      if (errorBody.nonFieldErrors !== undefined) {
        return { message: [errorBody.nonFieldErrors] };
      }
      for (const key in errorBody) {
        if (errorBody.hasOwnProperty(key)) {
          errorBody[_.camelCase(key)] = errorBody[key];
        }
      }
      return errorBody;
    }
  }
}
