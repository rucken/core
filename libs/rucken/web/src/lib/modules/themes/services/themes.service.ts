import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IStorage, STORAGE_CONFIG_TOKEN } from '@rucken/core';
import { DynamicRepository, Repository } from 'ngx-repository';
import { BehaviorSubject } from 'rxjs';
import { THEMES_CONFIG_TOKEN } from '../configs/themes.config';
import { IThemesConfig } from '../interfaces/themes-config.interface';
import { Theme } from '../models/theme';

export function themesServiceInitializeApp(themesService: ThemesService) {
  return () => themesService.initializeApp();
}

@Injectable()
export class ThemesService {
  get current() {
    if (!this.current$.getValue()) {
      return this.getStyleLinkHref();
    }
    return this.current$.getValue();
  }
  set current(value: string) {
    if (!value) {
      this._cookies.removeItem(this._themesConfig.storageKeyName).then(_ => {
        this.setStyleLinkHref(value);
        this.current$.next(value);
      });
    } else {
      this._cookies.setItem(this._themesConfig.storageKeyName, value).then(_ => {
        this.setStyleLinkHref(value);
        this.current$.next(value);
      });
    }
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
    const items = (this._themesConfig.mockedItems ? this._themesConfig.mockedItems : []).map((item, index) => {
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
  initCurrent() {
    return new Promise((resolve, reject) => {
      this._cookies.getItem(this._themesConfig.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          resolve(data);
        } else {
          resolve(this.current);
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.current = value as string;
        resolve();
      });
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
