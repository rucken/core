import { Inject, Injectable } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { IStorage } from './interfaces/storage.interface';

@Injectable()
export class UniversalStorage implements IStorage {
  [index: number]: string;
  [key: string]: any;
  length: number;
  cookies: any;
  constructor(@Inject(REQUEST) private request: any) {
    if (request === null) {
      this.cookies = [];
      return;
    }
    this.cookies = request.cookies;
  }
  public clear(): Promise<any> {
    return new Promise(resolve => {
      this.cookies = [];
      resolve(true);
    });
  }
  public getItem(key: string): Promise<string> {
    let data: string;
    try {
      data = JSON.parse(this.cookies[key]);
    } catch (error) {
      data = this.cookies[key];
    }
    return new Promise(resolve => {
      resolve(data);
    });
  }
  public key(index: number): Promise<string> {
    return new Promise(resolve => {
      const data = this.cookies.propertyIsEnumerable[index];
      resolve(data);
    });
  }
  public removeItem(key: string): Promise<any> {
    return new Promise(resolve => {
      this.cookies[key] = undefined;
      resolve(true);
    });
  }
  public setItem(key: string, data: string): Promise<any> {
    return new Promise(resolve => {
      try {
        this.cookies[key] = JSON.stringify(data);
      } catch (error) {
        this.cookies[key] = data;
      }
      resolve(true);
    });
  }
}
