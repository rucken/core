import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { decode } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { IStorage } from '../../storage/interfaces/storage.interface';
import { JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { IJwtConfig } from '../interfaces/jwt-config.interface';

export function tokenServiceInitializeApp(tokenService: TokenService) {
  return () => tokenService.initializeApp();
}

@Injectable()
export class TokenService {
  @BindObservable()
  current: string = undefined;
  current$: Observable<string>;
  @BindObservable()
  tokenHasExpired: boolean | undefined = undefined;
  tokenHasExpired$: Observable<boolean | undefined>;

  private _checkTokenHasExpiredIntervalRef;

  constructor(
    @Inject(JWT_CONFIG_TOKEN) private _jwtConfig: IJwtConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}
  initCurrent() {
    return new Promise((resolve, reject) => {
      this._storage.getItem(this._jwtConfig.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          resolve(data);
        } else {
          resolve(this.getCurrent());
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.setCurrent(value as string);
        resolve();
      });
    });
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(value: string) {
    if (!value) {
      this._storage.removeItem(this._jwtConfig.storageKeyName).then(_ => (this.current = undefined));
    } else {
      this._storage.setItem(this._jwtConfig.storageKeyName, value).then(_ => (this.current = value));
    }
    if (!isPlatformServer(this._platformId)) {
      if (value) {
        try {
          const tokenPayload = this.getTokenData(value).payload;
          if (this._checkTokenHasExpiredIntervalRef) {
            clearInterval(this._checkTokenHasExpiredIntervalRef);
          }
          this._checkTokenHasExpiredIntervalRef = setInterval(_ => {
            clearInterval(this._checkTokenHasExpiredIntervalRef);
            this.tokenHasExpired = true;
          }, (tokenPayload.exp - tokenPayload.iat) * 1000);
        } catch (error) {}
      } else {
        if (this._checkTokenHasExpiredIntervalRef) {
          clearInterval(this._checkTokenHasExpiredIntervalRef);
        }
      }
    }
  }
  getTokenData(token: string): { payload: { iat: number; exp: number } } {
    return decode(token, { complete: true }) as any;
  }
  getHeader() {
    const headers = {};
    headers[this._jwtConfig.headerName] = this._jwtConfig.headerPrefix + ' ' + this.getCurrent();
    return headers;
  }
}
