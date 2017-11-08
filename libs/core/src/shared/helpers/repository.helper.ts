import { Injectable, Injector } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { MetaModel } from './../models/meta.model';
import { EndpointHelper } from './endpoint.helper';
import { HttpHelper } from './http.helper';

@Injectable()
export class RepositoryHelper {

  httpHelper: HttpHelper;
  endpointHelper: EndpointHelper;

  constructor(
    public injector: Injector
  ) {
    this.httpHelper = injector.get(HttpHelper);
    this.endpointHelper = injector.get(EndpointHelper);
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
  itemUrl(repositoryService: any, key: any, data: any, action: string): string {
    let url = repositoryService.apiUrl;
    let customUrl: string;
    if (action && repositoryService.getApiUrl) {
      customUrl = repositoryService.getApiUrl(action, key, data);
    }
    if (key === undefined || key === null) {
      url = this.endpointHelper.actionUrl(repositoryService, null, data, customUrl);
    } else {
      url = this.endpointHelper.actionUrl(repositoryService, key, null, customUrl);
    }
    return url;
  }
  itemsUrl(repositoryService: any) {
    const uri = new URLSearchParams();
    let apiUrl = this.itemUrl(repositoryService, null, null, 'items');
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
    if (repositoryService.props !== null) {
      apiUrl = repositoryService.apiUrlWithProps;
      for (const propKey in repositoryService.props) {
        if (repositoryService.props.hasOwnProperty(propKey)) {
          apiUrl = apiUrl.replace(`{${propKey}}`, repositoryService.props[propKey]);
        }
      }
    }
    let key: string;
    if (repositoryService.columns) {
      for (const columnKey in repositoryService.columns) {
        if (repositoryService.columns.hasOwnProperty(columnKey)) {
          key = columnKey.split('.').map(item => _.camelCase(item)).join('.');
          if (repositoryService.columns[columnKey]['sort']) {
            if (repositoryService.columns[columnKey]['sort'] === 'asc') {
              uri.append('sort[]', _.snakeCase(key));
            }
            if (repositoryService.columns[columnKey]['sort'] === 'desc') {
              uri.append('sort[]', `-${_.snakeCase(key)}`);
            }
          }
        }
      }
    }
    return apiUrl + `?${uri.toString()}`;
  }
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
  }
  itemResponse(repositoryService: any, response: any, requestData?: any) {
    const data: any = this.endpointHelper.actionResponse(repositoryService, 'item', response);
    if (data[_.camelCase(repositoryService.name)]) {
      return data[_.camelCase(repositoryService.name)];
    } else {
      return data;
    }
  }
  readItemRequest(repositoryService: any, key: any): Observable<Response> {
    return this.httpHelper.get(
      this.itemUrl(repositoryService, key, null, 'item')
    );
  }
  readItemsRequest(repositoryService: any): Observable<Response> {
    return this.httpHelper.get(this.itemsUrl(repositoryService));
  }
  createItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.post(
      this.itemUrl(repositoryService, null, item, 'create'),
      this.endpointHelper.actionRequestBody(repositoryService, 'create', item)
    );
  }
  updateItemRequest(repositoryService: any, item: any): Observable<Response> {
    return this.httpHelper.put(
      this.itemUrl(repositoryService, item.pk, item, 'update'),
      this.endpointHelper.actionRequestBody(repositoryService, 'update', item)
    );
  }
  deleteItemsRequest(repositoryService: any, items: any): Observable<Response> {
    const ids = items.map((item: any) => item.pk);
    return this.httpHelper.delete(this.itemUrl(repositoryService, ids.join('|'), items[0], 'delete'));
  }
}
