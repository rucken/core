import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AppStorage } from '@rucken/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable()
export class ThemesStorage {

  storageKeyName = 'theme';

  constructor(
    @Inject(AppStorage) private _cookies: Storage,
    @Inject(DOCUMENT) private _document: any
  ) {
  }
  set(url: string) {
    if (!url) {
      this._cookies.removeItem(this.storageKeyName);
    } else {
      this._cookies.setItem(this.storageKeyName, url);
    }
    this.setStyleLinkHref(url);
  }
  get() {
    const theme = this._cookies.getItem(this.storageKeyName);
    if (theme && theme !== 'undefined') {
      return this._cookies.getItem(this.storageKeyName) as string;
    }
    return this.getStyleLinkHref();
  }
  setStyleLinkHref(url: string) {
    if (url) {
      const links = this._document.getElementsByTagName('link');
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
            link.getAttribute('title') === 'bootstrap' &&
            link.getAttribute('href') !== url
          ) {
            link.setAttribute('href', url);
          }
        }
      }
    }
  }
  getStyleLinkHref() {
    const links = this._document.getElementsByTagName('link');
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
    return undefined;
  }
}
