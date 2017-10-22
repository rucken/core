import 'rxjs/add/operator/takeUntil';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { User } from '@rucken/core';
import * as _ from 'lodash';

import { SharedService } from '../../../shared/services/shared.service';
import { BaseComponent } from './../../base-component/base-component.component';

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
  }
  afterCreate() {
    this.sharedService.linkTranslateService();
    this.translateService.onLangChange.takeUntil(this.destroyed$).subscribe(() => this.init());
    this.accountService.account$.takeUntil(this.destroyed$).subscribe(() => this.init());
    this.app.onCurrentPageTitle.takeUntil(this.destroyed$).subscribe(() => this.init());
  }
  init() {
    super.init();
    let frameTitle: string;
    if (this.name === undefined && this.activatedRoute.snapshot.data.name) {
      this.name = this.activatedRoute.snapshot.data.name;
      this.app.currentFrameName = this.name;
    }
    if (this._title === undefined) {
      if (this.activatedRoute.snapshot.data.title) {
        frameTitle = this.translateService.instant(this.activatedRoute.snapshot.data.title);
      } else {
        if (this.name) {
          frameTitle = this.translateService.instant(_.upperFirst(this.name));
        }
      }
      frameTitle = `${this.app.currentPageTitle}: ${frameTitle}`;
      this.app.currentFrameTitle = frameTitle;
      this.title = frameTitle;
    }
  }
}
