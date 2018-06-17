import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DynamicRepository, Repository } from 'ngx-repository';
import { Theme } from './theme';
import { ThemeItemsMock } from './theme-items.mock';
import { ThemesStorage } from './themes.storage';

export function themesServiceInitializeApp(themesService: ThemesService) {
  return () => themesService.initializeApp();
}

@Injectable()
export class ThemesService {

  get current() {
    return this._themesStorage.get();
  }
  set current(value: string) {
    this._themesStorage.set(value);
  }
  repository: Repository<Theme>;

  constructor(
    private _themesStorage: ThemesStorage,
    private _dynamicRepository: DynamicRepository,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.repository = this._dynamicRepository.fork<Theme>(Theme);
    const items = ThemeItemsMock.map((item, index) => {
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
      this.current = this._themesStorage.get();
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(_ => resolve(), 100);
      } else {
        resolve();
      }
    });
  }
}
