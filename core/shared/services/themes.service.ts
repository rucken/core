import { Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { BaseRepositoryService } from './../base/services/base-repository.service';
import { RepositoryHelper } from './../helpers/repository.helper';
import { ThemeItemsMock } from './../mocks/theme-items.mock';
import { Theme } from './../models/theme.model';

@Injectable()
export class ThemesService extends BaseRepositoryService {
  viewContainerRef: ViewContainerRef;
  items$: Subject<Theme[]>;
  items: Theme[];
  apiUrl: string;

  constructor(public repositoryHelper: RepositoryHelper) {
    super(repositoryHelper);
    this.pluralName = 'themes';
    this.name = 'theme';
    this.apiUrl = `${repositoryHelper.apiUrl}/${this.pluralName}`;
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
    return new ThemesService(this.repositoryHelper);
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
