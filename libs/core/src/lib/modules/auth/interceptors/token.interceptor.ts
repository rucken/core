import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { IJwtConfig } from '../interfaces/jwt-config.interface';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(@Inject(JWT_CONFIG_TOKEN) private _jwtConfig: IJwtConfig, private _tokenService: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      this._tokenService.getCurrent() &&
      this._jwtConfig &&
      this._jwtConfig.withoutTokenUrls &&
      this._jwtConfig.withoutTokenUrls.filter(rule => request.urlWithParams.indexOf(rule) !== -1).length === 0
    ) {
      request = request.clone({
        setHeaders: this._tokenService.getHeader()
      });
    }
    return next.handle(request);
  }
}
