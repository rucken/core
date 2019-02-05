import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BindObservable } from 'bind-observable';
import { plainToClass } from 'class-transformer';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../entities/models/user';
import { EMPTY_PERMISSIONS, INITED_PERMISSIONS } from '../../../utils/permissions-guard.const';
import { AUTH_CONFIG_TOKEN } from '../configs/auth.config';
import { OAUTH_CONFIG_TOKEN } from '../configs/oauth.config';
import { RedirectUrlDto } from '../dto/redirect-url.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { IAuthConfig } from '../interfaces/auth-config.interface';
import { IOauthConfig } from '../interfaces/oauth-config.interface';

export function authServiceInitializeApp(authService: AuthService) {
  return () => authService.initializeApp();
}

@Injectable()
export class AuthService {
  @BindObservable()
  current: User = undefined;
  current$: Observable<User>;

  constructor(
    @Inject(AUTH_CONFIG_TOKEN) private _authConfig: IAuthConfig,
    @Inject(OAUTH_CONFIG_TOKEN) private _oauthConfig: IOauthConfig,
    private _translateService: TranslateService,
    private _httpClient: HttpClient,
    private _permissionsService: NgxPermissionsService
  ) {
    this.initPermissions();
  }
  async initCurrent() {
    return this.getCurrent();
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.setCurrent(value);
        resolve();
      });
    });
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: User) {
    if (!value) {
      this.clearPermissions().then(_ => this.current = undefined);
    } else {
      if (value.permissionNames.length) {
        this.loadPermissions(value).then(_ => this.current = value);
      } else {
        this.clearPermissions().then(_ => this.current = undefined);
      }
    }
  }
  public initPermissions() {
    this._permissionsService.loadPermissions([INITED_PERMISSIONS]);
  }
  protected clearPermissions() {
    return new Promise((resolve, reject) => {
      this._permissionsService.loadPermissions([EMPTY_PERMISSIONS]);
      this._permissionsService.hasPermission([EMPTY_PERMISSIONS]).then(result => (result ? resolve() : reject()));
    });
  }
  protected loadPermissions(value: User) {
    return new Promise((resolve, reject) => {
      this._permissionsService.loadPermissions(value.permissionNames);
      this._permissionsService.hasPermission(value.permissionNames).then(result => (result ? resolve() : reject()));
    });
  }
  signIn(email: string, password: string): Observable<UserTokenDto> {
    return this._httpClient
      .post(this._authConfig.apiUrl + this._authConfig.signInUrl, {
        email,
        password
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
  info(token: string): Observable<UserTokenDto> {
    return this._httpClient
      .post(this._authConfig.apiUrl + this._authConfig.infoUrl, {
        token
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
  signOut(): Observable<boolean> {
    return of(true);
  }
  signUp(
    email: string,
    password: string,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Observable<UserTokenDto> {
    return this._httpClient
      .post(this._authConfig.apiUrl + this._authConfig.signUpUrl, {
        email,
        password,
        username,
        firstName,
        lastName
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
  oauthRedirectUrl(provider: string): Observable<RedirectUrlDto> {
    if (this._oauthConfig.providers.indexOf(provider) === -1) {
      return throwError(
        this._translateService
          .instant('Oauth provider with name "{provider}" not founded')
          .replace('{provider}', provider)
      );
    }
    const uri = this._oauthConfig.apiUrl + this._oauthConfig.redirectUrl.replace('{provider}', provider);
    return this._httpClient.get(uri).pipe(map(data => plainToClass(RedirectUrlDto, data)));
  }
  oauthSignIn(provider: string, code: string): Observable<UserTokenDto> {
    if (this._oauthConfig.providers.indexOf(provider) === -1) {
      return throwError(
        this._translateService
          .instant('Oauth provider with name "{provider}" not founded')
          .replace('{provider}', provider)
      );
    }
    const uri = this._oauthConfig.apiUrl + this._oauthConfig.signInUrl.replace('{provider}', provider);
    return this._httpClient
      .post(uri, {
        code
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
}
