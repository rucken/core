import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../services/token.service';

@Injectable()
export class HttpHelper {

  withCredentials = false;
  direct = false;

  http: HttpClient;
  tokenService: TokenService;

  constructor(
    public injector: Injector
  ) {
    this.http = injector.get(HttpClient);
    this.tokenService = injector.get(TokenService);
  }
  getRequestOptions() {
    const headers = { 'Content-Type': 'application/json' };
    return { headers: new HttpHeaders(headers), withCredentials: this.withCredentials };
  }
  getAuthRequestOptions() {
    const headers: any = { 'Content-Type': 'application/json' };
    headers[this.tokenService.headerName] = `${this.tokenService.headerPrefix} ${this.tokenService.get()}`;
    return { headers: new HttpHeaders(headers), withCredentials: this.withCredentials };
  }
  getRequestBody(data: any): string {
    if (!data) {
      data = {};
    }
    return JSON.stringify(data);
  }

  get(url: string, direct?: boolean): Observable<any> {
    if (direct || this.direct) {
      return this.http.get(url, this.getRequestOptions());
    }
    return this.http.get(url, this.getAuthRequestOptions());
  }

  patch(url: string, data?: any, direct?: boolean): Observable<any> {
    if (direct || this.direct) {
      return this.http.patch(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.http.patch(url, this.getRequestBody(data), this.getAuthRequestOptions());
  }

  post(url: string, data?: any, direct?: boolean): Observable<any> {
    if (direct || this.direct) {
      return this.http.post(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.http.post(url, this.getRequestBody(data), this.getAuthRequestOptions());
  }

  put(url: string, data?: any, direct?: boolean): Observable<any> {
    if (direct || this.direct) {
      return this.http.put(url, this.getRequestBody(data), this.getRequestOptions());
    }
    return this.http.put(url, this.getRequestBody(data), this.getAuthRequestOptions());
  }

  delete(url: string, direct?: boolean): Observable<any> {
    if (direct || this.direct) {
      return this.http.delete(url, this.getRequestOptions());
    }
    return this.http.delete(url, this.getAuthRequestOptions());
  }
}
