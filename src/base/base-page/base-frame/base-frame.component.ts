import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './../../../shared/app.service';
import { BaseComponent } from './../../base-component/base-component.component';
import { AccountService } from './../../../shared/account.service';
import * as _ from 'lodash';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'base-frame',
  template: ''
})
export class BaseFrameComponent extends BaseComponent {

  title?: string;
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
    let frameTitle: string = this.title;
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
    }
    if (frameTitle === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        frameTitle = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          frameTitle = this.translateService.instant(_.upperFirst(this.name));
        }
      }
    }
    this.title = `${this.app.currentPageTitle}: ${frameTitle}`;
    this.app.currentFrameName = this.name;
    this.app.currentFrameTitle = this.title;
  }
}
