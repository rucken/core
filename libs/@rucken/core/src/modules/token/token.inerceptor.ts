import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _tokenService: TokenService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: this._tokenService.getHeader()
    });
    return next.handle(request);
  }
}
