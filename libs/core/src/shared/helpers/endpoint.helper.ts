import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';
import * as lodashImported from 'lodash'; const _ = lodashImported;
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
  actionUrl(endpointService: any, action: any, data: any, customUrl: string | null) {
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
    return this.httpHelper.post(this.actionUrl(endpointService, action, null, null), this.actionRequestBody(endpointService, action, data));
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
    return response;
  }
  extractError(errorResponse: any, message?: string): any {
    if (message === undefined) {
      message = translate('Unknown error');
    }
    if (!errorResponse.error) {
      console.log(errorResponse);
      return { message: [errorResponse.statusText ? errorResponse.statusText : message] };
    } else {
      const errorBody = _.cloneDeep(errorResponse.error ? errorResponse.error : errorResponse);
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
