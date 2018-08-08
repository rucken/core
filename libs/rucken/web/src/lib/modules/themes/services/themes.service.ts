import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DynamicRepository, Repository } from 'ngx-repository';
import { Theme } from '../models/theme';
import { BehaviorSubject } from 'rxjs';

import { STORAGE_CONFIG_TOKEN } from '@rucken/core';
import { THEMES_CONFIG_TOKEN } from '../configs/themes.config';
import { IThemesConfig } from '../interfaces/themes-config.interface';
import { IStorage } from '@rucken/core';

export function themesServiceInitializeApp(themesService: ThemesService) {
  return () => themesService.initializeApp();
}

@Injectable()
export class ThemesService {
  get current() {
    const theme = this._cookies.getItem(this._themesConfig.storageKeyName);
    if (theme && theme !== 'undefined') {
      return this._cookies.getItem(this._themesConfig.storageKeyName) as string;
    }
    if (!this.current$.getValue()) {
      return this.getStyleLinkHref();
    }
    return this.current$.getValue();
  }
  set current(value: string) {
    if (!value) {
      this._cookies.removeItem(this._themesConfig.storageKeyName);
    } else {
      this._cookies.setItem(this._themesConfig.storageKeyName, value);
    }
    this.setStyleLinkHref(value);
    this.current$.next(value);
  }
  repository: Repository<Theme>;
  current$ = new BehaviorSubject<string>(undefined);

  constructor(
    @Inject(THEMES_CONFIG_TOKEN) private _themesConfig: IThemesConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _cookies: IStorage,
    @Inject(PLATFORM_ID) private _platformId: Object,
    @Inject(DOCUMENT) private _document: any,
    private _dynamicRepository: DynamicRepository
  ) {
    this.repository = this._dynamicRepository.fork<Theme>(Theme);
    const items = (this._themesConfig.mockedItems
      ? this._themesConfig.mockedItems
      : []
    ).map((item, index) => {
      item.id = index + 1;
      return item;
    });
    this.repository.useMock({
      items: items,
      paginationMeta: {
        perPage: 1000
      }
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.current = this.current;
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(_ => resolve(), 100);
      } else {
        resolve();
      }
    });
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
            (link.getAttribute('rel') as string).indexOf('style') !== -1 &&
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
