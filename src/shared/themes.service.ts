import { Injectable, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event, Event as NavigationEvent } from '@angular/router';
import { Theme } from './models/theme.model';
import { ResourceService } from '../shared/resource.service';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../shared/http.service';
import { ThemeItemsMock } from './mocks/theme-items.mock';
import { ResponseService } from './response.service';
@Injectable()
export class ThemesService extends ResourceService {
  public viewContainerRef: ViewContainerRef;
  public items$: Subject<Theme[]>;
  public items: Theme[];
  public apiUrl: string;

  constructor(public http: HttpService, public response: ResponseService) {
    super(http, response);
    this.resourcesName = 'themes';
    this.resourceName = 'theme';
    this.apiUrl = `${response.apiUrl}/${this.resourcesName}`;
    this.items$ = <Subject<Theme[]>>new Subject();
    this.mockedItems = ThemeItemsMock;
    this.meta.perPage = 100;
  }
  transformModel(item: any) {
    return new Theme(item);
  }
  newCache() {
    return new ThemesService(this.http, this.response);
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
