import 'rxjs/add/operator/takeUntil';

import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@rucken/core';
import * as _ from 'lodash';

import { BaseComponent } from './../../base-component/base-component.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'base-frame',
  template: ''
})
export class BaseFrameComponent extends BaseComponent {

  title?: string;

  activatedRoute: ActivatedRoute;
  router: Router;

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
    this.translateService.onLangChange.takeUntil(this.destroyed$).subscribe(() => this.initTitle());
    this.app.onCurrentPageTitle.takeUntil(this.destroyed$).subscribe(() => this.initTitle());
    if (this.accountService) {
      this.accountService.account$.takeUntil(this.destroyed$).subscribe((account: any | User) => this.initTitle());
    }
  }
  initTitle() {
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
  init() {
    super.init();
    this.initTitle();
  }
}
