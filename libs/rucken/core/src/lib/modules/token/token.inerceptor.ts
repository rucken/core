import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

export const WITHOUT_TOKEN_URLS = new InjectionToken<string[]>('WITHOUT_TOKEN_URLS');
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    @Inject(WITHOUT_TOKEN_URLS) private _withoutTokenUrls: string[] = []
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._withoutTokenUrls && this._withoutTokenUrls.filter(rule => request.urlWithParams.indexOf(rule) !== -1).length === 0) {
      request = request.clone({
        setHeaders: this._tokenService.getHeader()
      });
    }
    return next.handle(request);
  }
}
