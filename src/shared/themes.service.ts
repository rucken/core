import { Injectable, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, Event as NavigationEvent } from '@angular/router';
import { Theme } from './models/theme.model';
import { RepositoryService } from '../shared/repository.service';
import { Subject } from 'rxjs/Subject';
import { HttpHelper } from '../shared/helpers/http.helper';
import { ThemeItemsMock } from './mocks/theme-items.mock';
import { EndpointHelper } from './helpers/endpoint.helper';
@Injectable()
export class ThemesService extends RepositoryService {
  public viewContainerRef: ViewContainerRef;
  public items$: Subject<Theme[]>;
  public items: Theme[];
  public apiUrl: string;

  constructor(public httpHelper: HttpHelper, public endpointHelper: EndpointHelper) {
    super(httpHelper, endpointHelper);
    this.pluralName = 'themes';
    this.mame = 'theme';
    this.apiUrl = `${endpointHelper.apiUrl}/${this.pluralName}`;
    this.items$ = <Subject<Theme[]>>new Subject();
    this.mockedItems = ThemeItemsMock;
    this.meta.perPage = 100;
  }
  transformModel(item: any) {
    return new Theme(item);
  }
  newCache() {
    return new ThemesService(this.httpHelper, this.endpointHelper);
  }
  setTheme(theme: Theme) {
    if (!theme.url) {
      return;
    }
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link.getAttribute('rel').indexOf('style') !== -1 && link.getAttribute('title')
        && link.getAttribute('title') === 'bootstrap') {
        link.setAttribute('href', theme.url);
      }
    }
  }
  getCurrentTheme() {
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link.getAttribute('rel').indexOf('style') !== -1 && link.getAttribute('title')
        && link.getAttribute('title') === 'bootstrap') {
        for (let j = 0; j < this.items.length; j++) {
          if (link.getAttribute('href') === this.items[j].url) {
            return this.items[j];
          }
        }
      }
    }
    return new Theme();
  }
}
