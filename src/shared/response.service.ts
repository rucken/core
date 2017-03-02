import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MetaModel } from './models/meta.model';
import * as _ from 'lodash';

@Injectable()
export class ResponseService {
  get apiUrl() {
    return '/api';
  }
  getResourceItemUrl(resoureService: any, key?: any) {
    if (key === undefined) {
      return resoureService.apiUrl;
    } else {
      return `${resoureService.apiUrl}/${key}`;
    }
  };
  getResourcesListUrl(resoureService: any) {
    let uri = new URLSearchParams();
    for (let queryProp in resoureService.queryProps) {
      if (resoureService.queryProps.hasOwnProperty(queryProp)) {
        uri.append(_.snakeCase(queryProp), resoureService.queryProps[queryProp]);
      }
    }
    let apiUrl = resoureService.apiUrl;
    if (resoureService.props !== null) {
      apiUrl = resoureService.apiUrlWithProps;
      for (let propKey in resoureService.props) {
        if (resoureService.props.hasOwnProperty(propKey)) {
          apiUrl = apiUrl.replace(`{${propKey}}`, resoureService.props[propKey]);
        }
      }
    }
    return apiUrl + `?${uri.toString()}`;
  };
  getResourcesListResponse(resoureService: any, response: any) {
    let data = response.json();
    resoureService.meta = new MetaModel(data['meta']);
    return data[_.camelCase(resoureService.resourcesName)];
  };
  getResourceItemResponse(resoureService: any, response: any) {
    return response.json()[_.camelCase(resoureService.resourceName)];
  }
}
