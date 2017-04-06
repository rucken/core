import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { HttpHelper } from '../../../../../../dist';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DemoHttpHelper extends HttpHelper {
  public withCredentials: boolean = false;

  constructor(
    public authHttp: AuthHttp,
    public http: Http
  ) {
    super(authHttp, http);
  }

  get(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (environment.production) {
      return this.http.get(url, options);
    }
    return this.authHttp.get(url, options);
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
    if (environment.production) {
      return this.http.get(url);
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
    if (environment.production) {
      return this.http.get(url);
    }
    return this.authHttp.put(url, bodyString, options);
  }

  delete(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    if (environment.production) {
      return this.http.get(url);
    }
    return this.authHttp.delete(url, options);
  }
}
