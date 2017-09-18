import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './../../../shared/services/app.service';
import { BaseComponent } from './../../base-component/base-component.component';
import { AccountService } from './../../../shared/services/account.service';
import * as _ from 'lodash';
import { User } from './../../../shared/models/user.model';
import { SharedService } from './../../../shared/services/shared.service';

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
    public router: Router,
    public sharedService: SharedService
  ) {
    super();
    sharedService.linkTranslateService();
    translateService.onLangChange.subscribe(() => this.init());
    accountService.account$.subscribe(() => this.init());
    app.onCurrentPageTitle.subscribe(() => this.init());
  }
  init() {
    super.init();
    let frameTitle: string;
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
    }
    if (this._title === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        frameTitle = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          frameTitle = this.translateService.instant(_.upperFirst(this.name));
        }
      }
    }
    frameTitle = `${this.app.currentPageTitle}: ${frameTitle}`;
    this.app.currentFrameName = this.name;
    this.app.currentFrameTitle = frameTitle;
    this.title = frameTitle;
  }
}
