import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { decode } from 'jsonwebtoken';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_CONFIG_TOKEN } from '../../storage/configs/storage.config';
import { IStorage } from '../../storage/interfaces/storage.interface';
import { JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { IJwtConfig } from '../interfaces/jwt-config.interface';

export function tokenServiceInitializeApp(tokenService: TokenService) {
  return () => tokenService.initializeApp();
}

@Injectable()
export class TokenService {
  get current() {
    return this.current$.getValue();
  }
  set current(value: string) {
    if (!value) {
      this._cookies.removeItem(this._jwtConfig.storageKeyName);
      this.current$.next(undefined);
    } else {
      this._cookies.setItem(this._jwtConfig.storageKeyName, value);
      this.current$.next(value);
    }
  }
  current$ = new BehaviorSubject<string>(undefined);
  tokenHasExpired$ = new BehaviorSubject<boolean | undefined>(undefined);

  private _checkTokenHasExpiredIntervalRef;

  constructor(
    @Inject(JWT_CONFIG_TOKEN) private _jwtConfig: IJwtConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _cookies: IStorage,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }
  async initCurrent() {
    const data = await this._cookies.getItem(
      this._jwtConfig.storageKeyName
    ) as string;
    if (data && data !== 'undefined') {
      return data;
    }
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
  stopCheckTokenHasExpired() {
    if (!isPlatformServer(this._platformId)) {
      if (this._checkTokenHasExpiredIntervalRef) {
        clearInterval(this._checkTokenHasExpiredIntervalRef);
      }
    }
  }
  startCheckTokenHasExpired() {
    if (!isPlatformServer(this._platformId)) {
      this._checkTokenHasExpiredIntervalRef = setInterval(_ => {
        if (this.tokenHasExpired()) {
          this.tokenHasExpired$.next(true);
        }
      }, 30 * 1000);
    }
  }
  getTokenData(token: string): { payload: { exp: number } } {
    return decode(token, { complete: true }) as any;
  }
  tokenHasExpired(token?: string) {
    if (!token) {
      token = this.current;
    }
    try {
      const result =
        new Date() > new Date(this.getTokenData(token).payload.exp * 1000);
      return result;
    } catch (error) {
      return true;
    }
  }
  getHeader() {
    const headers = {};
    headers[this._jwtConfig.headerName] =
      this._jwtConfig.headerPrefix + ' ' + this.current;
    return headers;
  }
}
