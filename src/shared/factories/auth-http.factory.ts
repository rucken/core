import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
export class AuthHttpFactory {
  static create(http: Http, options: RequestOptions) {
    const tokenGetter = () => localStorage.getItem('token');
    return new AuthHttp(new AuthConfig({
      headerName: 'Authorization',
      headerPrefix: 'JWT',
      tokenName: 'token',
      tokenGetter: tokenGetter,
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true,
      noTokenScheme: true
    }), http, options);
  }
}
