import { Injectable, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, Event as NavigationEvent } from '@angular/router';
import { Theme } from './../models/theme.model';
import { BaseRepositoryService } from './../base/services/base-repository.service';
import { Subject } from 'rxjs/Subject';
import { ThemeItemsMock } from './../mocks/theme-items.mock';
import { RepositoryHelper } from './../helpers/repository.helper';
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
