import { Inject, Injectable } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Storage } from './storage';

@Injectable()
export class UniversalStorage implements Storage {
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

  public clear(): void {
    this.cookies = [];
  }

  public getItem(key: string): string {
    try {
      return JSON.parse(this.cookies[key]);
    } catch (error) {
      return this.cookies[key];
    }
  }

  public key(index: number): string {
    return this.cookies.propertyIsEnumerable[index];
  }

  public removeItem(key: string): void {
    this.cookies[key] = undefined;
  }

  public setItem(key: string, data: string): void {
    try {
      this.cookies[key] = JSON.stringify(data);
    } catch (error) {
      this.cookies[key] = data;
    }
  }
}
