import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class DemoHttpService {

  public withCredentials: boolean = false;
  constructor(
    //public http: AuthHttp
    public http: Http
  ) {

  }

  get(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    return this.http.get(url, options);
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
    return this.http.post(url, bodyString, options);
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
    return this.http.put(url, bodyString, options);
  }

  delete(url: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers, withCredentials: this.withCredentials });
    return this.http.delete(url, options);
  }
}
