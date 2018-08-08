import { isPlatformServer } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITransferHttpResponse } from './transfer-http-response.interface';

@Injectable()
export class TransferHttpCacheInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}
  getHeadersMap(headers: HttpHeaders) {
    const headersMap: { [name: string]: string[] } = {};
    for (const key of headers.keys()) {
      if (headers.getAll(key)) {
        headersMap[key] = headers.getAll(key);
      }
    }
    return headersMap;
  }
  private getStoreKey(req: HttpRequest<any>) {
    let key: string;
    if (req.method === 'GET') {
      key = 'G.' + req.urlWithParams;
    }
    if (req.method === 'HEAD') {
      key = 'H.' + req.urlWithParams + '#' + JSON.stringify(req.body);
    }
    if (req.method === 'POST') {
      key = 'P.' + req.urlWithParams + '#' + JSON.stringify(req.body);
    }
    return makeStateKey<ITransferHttpResponse>(key);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storeKey = this.getStoreKey(req);
    if (this.transferState.hasKey(storeKey)) {
      const response = this.transferState.get(
        storeKey,
        {} as ITransferHttpResponse
      );
      if (!isPlatformServer(this._platformId)) {
        this.transferState.remove(storeKey);
      }
      return of(
        new HttpResponse<any>({
          body: response.body,
          headers: new HttpHeaders(response.headers),
          status: response.status,
          statusText: response.statusText,
          url: response.url
        })
      );
    } else {
      const httpEvent = next.handle(req);
      return httpEvent.pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (isPlatformServer(this._platformId)) {
              this.transferState.set(storeKey, {
                body: event.body,
                headers: this.getHeadersMap(event.headers),
                status: event.status,
                statusText: event.statusText,
                url: event.url
              });
            }
          }
        })
      );
    }
  }
}
