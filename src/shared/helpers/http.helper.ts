import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HttpHelper {

  public withCredentials: boolean = false;

  constructor(public authHttp: AuthHttp, public http: Http) {
  }

  get(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (url.indexOf('mockapi.io') !== -1) {
      options = new RequestOptions({ headers: headers });
      return this.http.get(url, options);
    }
    return this.authHttp.get(url, options);
  }

  patch(url: string, data?: any): Observable<Response> {
    if (data === undefined) {
      data = {};
    }
    if (data.format !== undefined) {
      data = data.format();
    }
    let bodyString = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (url.indexOf('mockapi.io') !== -1) {
      options = new RequestOptions({ headers: headers });
      return this.http.post(url, bodyString, options);
    }
    return this.authHttp.patch(url, bodyString, options);
  }

  post(url: string, data?: any): Observable<Response> {
    if (data === undefined) {
      data = {};
    }
    if (data.format !== undefined) {
      data = data.format();
    }
    let bodyString = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (url.indexOf('mockapi.io') !== -1) {
      options = new RequestOptions({ headers: headers });
      return this.http.post(url, bodyString, options);
    }
    return this.authHttp.post(url, bodyString, options);
  }

  put(url: string, data?: any): Observable<Response> {
    if (data === undefined) {
      data = {};
    }
    if (data.format !== undefined) {
      data = data.format();
    }
    let bodyString = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (url.indexOf('mockapi.io') !== -1) {
      options = new RequestOptions({ headers: headers });
      return this.http.put(url, bodyString, options);
    }
    return this.authHttp.put(url, bodyString, options);
  }

  delete(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (url.indexOf('mockapi.io') !== -1) {
      options = new RequestOptions({ headers: headers });
      return this.http.delete(url, options);
    }
    return this.authHttp.delete(url, options);
  }
}
