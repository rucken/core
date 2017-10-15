import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpHelper {

  withCredentials = false;
  direct = false;

  constructor(public authHttp: AuthHttp, public http: Http) {
  }
  getRequestOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
  }
  getRequestBody(data: any): string {
    if (data === undefined) {
      data = {};
    }
    return JSON.stringify(data);
  }

  get(url: string, direct?: boolean): Observable<Response> {
    if (direct || this.direct) {
      return this.http.get(url, this.getRequestOptions());
    }
    return this.authHttp.get(url, this.getRequestOptions());
  }

  patch(url: string, data?: any, direct?: boolean): Observable<Response> {
    if (direct || this.direct) {
      return this.http.patch(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.authHttp.patch(url, this.getRequestBody(data), this.getRequestOptions());
  }

  post(url: string, data?: any, direct?: boolean): Observable<Response> {
    if (direct || this.direct) {
      return this.http.post(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.authHttp.post(url, this.getRequestBody(data), this.getRequestOptions());
  }

  put(url: string, data?: any, direct?: boolean): Observable<Response> {
    if (direct || this.direct) {
      return this.http.put(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.authHttp.put(url, this.getRequestBody(data), this.getRequestOptions());
  }

  delete(url: string, direct?: boolean): Observable<Response> {
    if (direct || this.direct) {
      return this.http.delete(url, this.getRequestOptions());
    }
    return this.authHttp.delete(url, this.getRequestOptions());
  }
}
