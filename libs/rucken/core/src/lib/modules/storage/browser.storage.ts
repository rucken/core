import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IStorage } from './interfaces/storage.interface';

@Injectable()
export class BrowserStorage implements IStorage {
  [index: number]: string;
  [key: string]: any;
  length: number;
  constructor(private _cookieService: CookieService) {}
  public clear(): Promise<any> {
    return new Promise(resolve => {
      this._cookieService.deleteAll();
      resolve(true);
    });
  }
  public getItem(key: string): Promise<string> {
    let data: string;
    try {
      data = JSON.parse(this._cookieService.get(key));
    } catch (error) {
      data = this._cookieService.get(key);
    }
    return new Promise(resolve => {
      resolve(data);
    });
  }
  public key(index: number): Promise<string> {
    return new Promise(resolve => {
      const data = this._cookieService.getAll().propertyIsEnumerable[index];
      resolve(data);
    });
  }
  public removeItem(key: string): Promise<any> {
    return new Promise(resolve => {
      this._cookieService.delete(key, '/');
      resolve(true);
    });
  }
  public setItem(key: string, data: any): Promise<any> {
    return new Promise(resolve => {
      try {
        this._cookieService.set(key, JSON.stringify(data), undefined, '/');
      } catch (error) {
        this._cookieService.set(key, data, undefined, '/');
      }
      resolve(true);
    });
  }
}
