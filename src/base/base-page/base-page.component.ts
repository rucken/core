import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './../../shared/app.service';
import { BaseComponent } from './../base-component/base-component.component';
import { AccountService } from './../../shared/account.service';
import * as _ from 'lodash';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseComponent {

  searchTextValue = '';
  title?: string;
  get childrenRoutes() {
    const items: any[] = this.activatedRoute.snapshot.data.children.filter(
      (item: any) =>
        item.data &&
        item.data.visible &&
        this.account &&
        this.account.checkPermissions([`read_${item.data.name}-frame`]) &&
        this.checkWordInSearchText(item.data.title)
    ).map(
      (item: any) => {
        const newItem = item.data;
        newItem.title = this.translateService.instant(newItem.title);
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
    public router: Router
  ) {
    super();
    this.accountService.account$.subscribe((user: any | User) => {
      this.init();
    })
  }
  init() {
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
    }
    if (this.title === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        this.title = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          this.title = this.translateService.instant(_.upperFirst(this.name));
        }
      }
    }
    this.app.currentPageName = this.name;
    this.app.currentPageTitle = this.title;
  }
  checkWordInSearchText(word: string) {
    return this.translateService.instant(word).toLowerCase().indexOf(this.searchTextValue.toLowerCase()) !== -1;
  }
}
