import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable()
export class UtilsService {
  static inValues(item: any, q: string) {
    let founded = false;
    for (let key in item) {
      if (!founded && item.hasOwnProperty(key) && key[0] !== '_') {
        let value: any = item[key];
        if (!_.isString(value)) {
          if (value['asString'] === undefined) {
            value = value.toString();
          } else {
            value = value.asString;
          }
        }
        if (value.indexOf(q) !== -1) {
          founded = true;
        }
      }
    }
    return founded;
  }
  static isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  static extractError(error: any, message?: string): any {
    if (message === undefined) {
      message = 'Unknown error';
    }
    if (!error._body || !UtilsService.isJson(error._body) || error.json().type === 'error') {
      console.log(error);
      return { message: [error.statusText ? error.statusText : message] };
    } else {
      let errorBody = error.json();
      if (errorBody.errors !== undefined) {
        return { message: [errorBody.errors] };
      }
      if (errorBody.detail !== undefined) {
        return { message: [errorBody.detail] };
      }
      if (errorBody.nonFieldErrors !== undefined) {
        return { message: [errorBody.nonFieldErrors] };
      }
      let key: any;
      for (key in errorBody) {
        if (errorBody.hasOwnProperty(key)) {
          errorBody[_.camelCase(key)] = errorBody[key];
        }
      }
      return errorBody;
    }
  }
}
