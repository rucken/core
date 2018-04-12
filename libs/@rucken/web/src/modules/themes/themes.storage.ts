import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BrowserCookiesService } from '@rucken/core';
@Injectable()
export class ThemesStorage {

  storageKeyName = 'theme';

  set(url: string) {
    this._cookiesStorage.setItem(this.storageKeyName, url);
    this.setStyleLinkHref(url);
  }
  get() {
    if (this._cookiesStorage.getItem(this.storageKeyName)) {
      return this._cookiesStorage.getItem(this.storageKeyName);
    }
    return this.getStyleLinkHref();
  }
  setStyleLinkHref(url: string) {
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
    private _cookiesStorage: BrowserCookiesService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }
}
