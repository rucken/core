import { Injectable, Inject } from '@angular/core';
import { TokenService } from '@rucken/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class WebTokenService extends TokenService {

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object
  ) {
    super();
  }

  get(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return '';
  }

  set(value: string | null) {
    if (isPlatformBrowser(this.platformId)) {
      if (value === null) {
        localStorage.removeItem('token');
      } else {
        localStorage.setItem('token', value);
      }
    }
  }
}
