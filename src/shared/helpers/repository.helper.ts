import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { EndpointHelper } from './endpoint.helper';
import { HttpHelper } from './http.helper';
import { MetaModel } from './../models/meta.model';

@Injectable()
export class RepositoryHelper extends EndpointHelper {
  constructor(public httpHelper: HttpHelper) {
    super(httpHelper);
  }
  itemUrl(repositoryService: any, key?: any) {
    if (key === undefined) {
      return repositoryService.apiUrl;
    } else {
      return `${repositoryService.apiUrl}/${key}`;
    }
  };
  itemsUrl(repositoryService: any) {
    const uri = new URLSearchParams();
    for (const queryProp in repositoryService.queryProps) {
      if (repositoryService.queryProps.hasOwnProperty(queryProp)) {
        uri.append(_.snakeCase(queryProp), repositoryService.queryProps[queryProp]);
      }
    }
    let apiUrl = repositoryService.apiUrl;
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
    let data: any;
    if (response.json && _.isFunction(response.json)) {
      data = response.json();
    } else {
      data = response;
    }
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
    let data: any;
    if (response.json && _.isFunction(response.json)) {
      data = response.json();
    } else {
      data = response;
    }
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
    if (item && item.format) {
      item = item.format();
    }
    return this.httpHelper.post(
      this.itemUrl(repositoryService),
      item
    );
  };
  updateItemRequest(repositoryService: any, item: any): Observable<Response> {
    const pkValue = item.pk;
    if (item && item.format) {
      item = item.format();
    }
    return this.httpHelper.put(
      this.itemUrl(repositoryService, pkValue),
      item
    );
  };
  deleteItemsRequest(repositoryService: any, items: any): Observable<Response> {
    const ids = items.map((item: any) => item.pk);
    return this.httpHelper.delete(this.itemUrl(repositoryService, ids.join('|')));
  };
}
