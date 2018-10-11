import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { plainToClass } from 'class-transformer';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../entities/models/user';
import { EMPTY_PERMISSIONS, INITED_PERMISSIONS } from '../../../utils/permissions-guard.const';
import { AUTH_CONFIG_TOKEN } from '../configs/auth.config';
import { OAUTH_CONFIG_TOKEN } from '../configs/oauth.config';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { IAuthConfig } from '../interfaces/auth-config.interface';
import { IOauthConfig } from '../interfaces/oauth-config.interface';

export function authServiceInitializeApp(authService: AuthService) {
  return () => authService.initializeApp();
}

@Injectable()
export class AuthService {
  get current() {
    return this.current$.getValue();
  }
  set current(value: User) {
    if (!value) {
      this.clearPermissions().then(_ => this.current$.next(undefined));
    } else {
      if (value.permissionNames.length) {
        this.loadPermissions(value).then(_ => this.current$.next(value));
      } else {
        this.clearPermissions().then(_ => this.current$.next(undefined));
      }
    }
  }
  current$ = new BehaviorSubject<User>(undefined);

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
    return this.current;
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.current = value;
        resolve();
      });
    });
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
      .post(this._authConfig.apiUri + this._authConfig.signInUri, {
        email,
        password
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
  info(token: string): Observable<UserTokenDto> {
    return this._httpClient
      .post(this._authConfig.apiUri + this._authConfig.infoUri, {
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
      .post(this._authConfig.apiUri + this._authConfig.signUpUri, {
        email,
        password,
        username,
        firstName,
        lastName
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
  oauthRedirectUri(provider: string): Observable<RedirectUriDto> {
    if (this._oauthConfig.providers.indexOf(provider) === -1) {
      return throwError(
        this._translateService
          .instant('Oauth provider with name "{provider}" not founded')
          .replace('{provider}', provider)
      );
    }
    const uri = this._oauthConfig.apiUri + this._oauthConfig.redirectUri.replace('{provider}', provider);
    return this._httpClient.get(uri).pipe(map(data => plainToClass(RedirectUriDto, data)));
  }
  oauthSignIn(provider: string, code: string): Observable<UserTokenDto> {
    if (this._oauthConfig.providers.indexOf(provider) === -1) {
      return throwError(
        this._translateService
          .instant('Oauth provider with name "{provider}" not founded')
          .replace('{provider}', provider)
      );
    }
    const uri = this._oauthConfig.apiUri + this._oauthConfig.signInUri.replace('{provider}', provider);
    return this._httpClient
      .post(uri, {
        code
      })
      .pipe(map(data => plainToClass(UserTokenDto, data)));
  }
}
