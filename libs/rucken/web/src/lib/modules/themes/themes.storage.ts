import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';
@Injectable()
export class ThemesStorage {

  storageKeyName = 'theme';

  set(url: string) {
    if (!url) {
      this._cookies.remove(this.storageKeyName);
    } else {
      this._cookies.putObject(this.storageKeyName, url);
    }
    this.setStyleLinkHref(url);
  }
  get() {
    const theme = this._cookies.getObject(this.storageKeyName);
    if (theme && theme !== 'undefined') {
      return this._cookies.getObject(this.storageKeyName) as string;
    }
    return this.getStyleLinkHref();
  }
  setStyleLinkHref(url: string) {
    if (url) {
      if (isPlatformBrowser(this._platformId)) {
        const links = document.getElementsByTagName('link');
        if (links && links.length && url) {
          for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (
              link &&
              link.getAttribute('rel') &&
              (
                link.getAttribute('rel') as string
              ).indexOf('style') !== -1 &&
              link.getAttribute('title') &&
              link.getAttribute('title') === 'bootstrap'
            ) {
              link.setAttribute('href', url);
            }
          }
        }
      }
    }
  }
  getStyleLinkHref() {
    if (isPlatformBrowser(this._platformId)) {
      const links = document.getElementsByTagName('link');
      if (links && links.length) {
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          if (
            link &&
            link.getAttribute('rel') &&
            link.getAttribute('rel').indexOf('style') !== -1 &&
            link.getAttribute('title') &&
            link.getAttribute('title') === 'bootstrap' &&
            link.getAttribute('href').indexOf('/3/') === -1
          ) {
            return link.getAttribute('href');
          }
        }
      }
    }
    return undefined;
  }
  constructor(
    private _cookies: CookiesService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }
}
