import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { EndpointHelper } from './endpoint.helper';
import { HttpHelper } from './http.helper';
import { MetaModel } from './../models/meta.model';

@Injectable()
export class RepositoryHelper {
  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {

  }
  get mockApiUrl() {
    return this.endpointHelper.apiUrl;
  }
  get apiUrl() {
    return this.endpointHelper.apiUrl;
  }
  extractError(error: any, message?: string): any {
    return this.endpointHelper.extractError(error, message);
  }
  itemUrl(repositoryService: any, key?: any) {
    if (key === undefined) {
      return this.endpointHelper.actionUrl(repositoryService);
    } else {
      return this.endpointHelper.actionUrl(repositoryService, key)
    }
  };
  itemsUrl(repositoryService: any) {
    const uri = new URLSearchParams();
    for (const queryProp in repositoryService.queryProps) {
      if (repositoryService.queryProps.hasOwnProperty(queryProp)) {
        const queryPropKey = queryProp.indexOf('{') === -1 ? _.snakeCase(queryProp) : queryProp;
        const value = repositoryService.queryProps[queryProp];
        if (_.isArray(value)) {
          value.map((val: any) => {
            uri.append(`${queryPropKey}[]`, val.pk ? val.pk : val);
          });
        } else {
          uri.append(queryPropKey, value);
        }
      }
    }
    let apiUrl = this.endpointHelper.actionUrl(repositoryService);
    if (repositoryService.props !== null) {
      apiUrl = repositoryService.apiUrlWithProps;
      for (const propKey in repositoryService.props) {
        if (repositoryService.props.hasOwnProperty(propKey)) {
          apiUrl = apiUrl.replace(`{${propKey}}`, repositoryService.props[propKey]);
        }
      }
    }
    for (const key in repositoryService.columns) {
      if (repositoryService.columns.hasOwnProperty(key)) {
        if (repositoryService.columns[key]['sort']) {
          if (repositoryService.columns[key]['sort'] === 'asc') {
            uri.append('sort[]', _.snakeCase(key));
          }
          if (repositoryService.columns[key]['sort'] === 'desc') {
            uri.append('sort[]', `-${_.snakeCase(key)}`);
          }
        }
      }
    }
    return apiUrl + `?${uri.toString()}`;
  };
  itemsResponse(repositoryService: any, response: any) {
    const data: any = this.endpointHelper.actionResponse(repositoryService, 'items', response);
    if (data['meta']) {
      repositoryService.meta = new MetaModel(data['meta']);
    }
    if (data[_.camelCase(repositoryService.pluralName)]) {
      return data[_.camelCase(repositoryService.pluralName)];
    } else {
      return data;
    }
  };
  itemResponse(repositoryService: any, response: any, requestData?: any) {
    const data: any = this.endpointHelper.actionResponse(repositoryService, 'item', response);
    if (data[_.camelCase(repositoryService.name)]) {
      return data[_.camelCase(repositoryService.name)];
    } else {
      return data;
    }
  };
  readItemRequest(repositoryService: any, key: any): Observable<Response> {
    return this.httpHelper.get(
      this.itemUrl(repositoryService, key)
    );
  };
  readItemsRequest(repositoryService: any): Observable<Response> {
    return this.httpHelper.get(this.itemsUrl(repositoryService));
  };
  createItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.post(
      this.itemUrl(repositoryService),
      this.endpointHelper.actionRequestBody(repositoryService, 'create', item)
    );
  };
  updateItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.put(
      this.itemUrl(repositoryService, item.pk),
      this.endpointHelper.actionRequestBody(repositoryService, 'update', item)
    );
  };
  deleteItemsRequest(repositoryService: any, items: any): Observable<Response> {
    const ids = items.map((item: any) => item.pk);
    return this.httpHelper.delete(this.itemUrl(repositoryService, ids.join('|')));
  };
}
