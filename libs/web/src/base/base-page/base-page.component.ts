import { takeUntil } from 'rxjs/operators';

import { Component, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@rucken/core';
import * as lodashImported from 'lodash'; const _ = lodashImported;

import { BaseComponent } from './../base-component/base-component.component';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseComponent {

  @Input()
  title?: string;
  @Input()
  searchTextValue = '';

  activatedRoute: ActivatedRoute;
  router: Router;

  protected _childrenRoutes: any[] = [];

  constructor(
    public injector: Injector
  ) {
    super(injector);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
  }
  afterCreate() {
    super.afterCreate();
    this.sharedService.linkTranslateService();
    this.translateService.onLangChange.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.initTitle();
      this.initChildrenRoutes();
    });
    if (this.accountService) {
      this.accountService.account$.pipe(takeUntil(this.destroyed$)).subscribe((account: any | User) => {
        this.initTitle();
        this.initChildrenRoutes();
      });
    }
  }
  init() {
    super.init();
    this.initTitle();
    this.initChildrenRoutes();
  }
  initTitle() {
    let pageTitle = '';
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
      this.app.currentPageName = this.activatedRoute.snapshot.data.name;
    }
    if (this.title === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        pageTitle = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          pageTitle = this.translateService.instant(_.upperFirst(this.name));
        }
      }
      this.app.currentPageTitle = pageTitle;
      this.title = pageTitle;
    }
  }
  initChildrenRoutes() {
    this.childrenRoutes = this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.children ?
      this.activatedRoute.snapshot.data.children : [];
  }
  sortChildrenRoutes(routes: any[]) {
    return _.sortBy(routes, [
      (route: any) => route.title
    ]);
  }
  set childrenRoutes(routes: any[]) {
    this._childrenRoutes = this.sortChildrenRoutes(routes.filter(
      (item: any) =>
        item.data &&
        this.checkPermissions([`read_${item.data.name}-frame`])
    ));
  }
  get childrenRoutes() {
    return this._childrenRoutes.filter(
      (item: any) =>
        this.checkWordInSearchText(item.data.title)
    ).map(
      (item: any) => {
        const newItem = item.data;
        newItem.url = `/${this.name}/${newItem.name}`;
        return newItem;
      });
  }
  checkWordInSearchText(word: string) {
    return this.translateService.instant(word).toLowerCase().indexOf(this.searchTextValue.toLowerCase()) !== -1;
  }
}
