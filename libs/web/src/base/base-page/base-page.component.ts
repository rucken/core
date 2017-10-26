import 'rxjs/add/operator/takeUntil';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { User } from '@rucken/core';
import * as _ from 'lodash';

import { SharedService } from '../../shared/services/shared.service';
import { BaseComponent } from './../base-component/base-component.component';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseComponent {

  title?: string;
  searchTextValue = '';

  protected _childrenRoutes: any[] = [];

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sharedService: SharedService
  ) {
    super();
  }
  afterCreate() {
    this.sharedService.linkTranslateService();
    this.translateService.onLangChange.takeUntil(this.destroyed$).subscribe(() => this.init());
    this.accountService.account$.takeUntil(this.destroyed$).subscribe(() => this.init());
  }
  init() {
    super.init();
    let pageTitle = '';
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
      this.app.currentPageName = this.activatedRoute.snapshot.data.name;
    }
    if (this._title === undefined) {
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
    this.initChildrenRoutes();
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
