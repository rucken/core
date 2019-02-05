import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IStorage, STORAGE_CONFIG_TOKEN } from '@rucken/core';
import { BindObservable } from 'bind-observable';
import { DynamicRepository, Repository } from 'ngx-repository';
import { Observable } from 'rxjs';
import { THEMES_CONFIG_TOKEN } from '../configs/themes.config';
import { IThemesConfig } from '../interfaces/themes-config.interface';
import { Theme } from '../models/theme';

export function themesServiceInitializeApp(themesService: ThemesService) {
  return () => themesService.initializeApp();
}

@Injectable()
export class ThemesService {
  repository: Repository<Theme> = undefined;
  @BindObservable()
  current: string = undefined;
  current$: Observable<string>;

  constructor(
    @Inject(THEMES_CONFIG_TOKEN) private _themesConfig: IThemesConfig,
    @Inject(STORAGE_CONFIG_TOKEN) private _storage: IStorage,
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
      this._storage.getItem(this._themesConfig.storageKeyName).then((data: string) => {
        if (data && data !== 'undefined') {
          resolve(data);
        } else {
          resolve(this.getCurrent());
        }
      });
    });
  }
  initializeApp() {
    return new Promise((resolve, reject) => {
      this.initCurrent().then(value => {
        this.setCurrent(String(value));
        resolve();
      });
    });
  }
  getCurrent() {
    if (!this.current) {
      return this.getStyleLinkHref();
    }
    return this.current;
  }
  setCurrent(value: string) {
    if (!value) {
      this.setStyleLinkHref(value);
      this._storage.removeItem(this._themesConfig.storageKeyName).then(_ => {
        this.current = value;
      });
    } else {
      this.setStyleLinkHref(value);
      this._storage.setItem(this._themesConfig.storageKeyName, value).then(_ => {
        this.current = value;
      });
    }
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
            String(link.getAttribute('rel')).indexOf('style') !== -1 &&
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
