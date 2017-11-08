import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { ThemeItemsMock } from './../mocks/theme-items.mock';
import { Theme } from './../models/theme.model';

@Injectable()
export class ThemesService extends BaseRepositoryService {
  viewContainerRef: ViewContainerRef;
  items$: Subject<Theme[]>;
  items: Theme[];
  apiUrl: string;

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.pluralName = 'themes';
    this.name = 'theme';
    this.apiUrl = `${this.repositoryHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Theme[]>>new Subject();
    this.mockedItems = ThemeItemsMock;
    this.meta.perPage = 100;
    this.initTheme();
  }
  initTheme() {
    // you custom code in extended class
  }
  transformModel(item: any) {
    return new Theme(item);
  }
  newCache() {
    return new ThemesService(this.injector);
  }
  setTheme(theme: Theme) {
    if (!theme.url || theme.pk === this.getCurrentTheme().pk) {
      return;
    }
    // you custom code in extended class
  }
  getCurrentTheme() {
    // you custom code in extended class
    return new Theme();
  }
}
