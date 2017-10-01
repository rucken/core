import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { User } from '@rucken/core';
import { SharedService } from '@rucken/core';
import * as _ from 'lodash';

import { BaseComponent } from './../base-component/base-component.component';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseComponent {

  title?: string;
  searchTextValue = '';
  get childrenRoutes() {
    const items: any[] = (
      this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.children ?
        this.activatedRoute.snapshot.data.children : []).filter(
      (item: any) =>
        item.data &&
        item.data.visible &&
        this.account &&
        this.account.checkPermissions([`read_${item.data.name}-frame`]) &&
        this.checkWordInSearchText(item.data.title)
      ).map(
      (item: any) => {
        const newItem = item.data;
        newItem.url = `${this.name}/${newItem.name}`;
        return newItem;
      });
    return _.sortBy(items, [
      (item: any) => { return item.title }
    ]);
  }
  get account(): any | User {
    return this.accountService.account;
  }

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sharedService: SharedService
  ) {
    super();
    sharedService.linkTranslateService();
    translateService.onLangChange.subscribe(() => this.init());
    accountService.account$.subscribe(() => this.init());
  }
  init() {
    super.init();
    let pageTitle: string;
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
    }
    if (this._title === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        pageTitle = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          pageTitle = this.translateService.instant(_.upperFirst(this.name));
        }
      }
    }
    this.app.currentPageName = this.name;
    this.app.currentPageTitle = pageTitle;
    this.title = pageTitle;
  }
  checkWordInSearchText(word: string) {
    return this.translateService.instant(word).toLowerCase().indexOf(this.searchTextValue.toLowerCase()) !== -1;
  }
}
