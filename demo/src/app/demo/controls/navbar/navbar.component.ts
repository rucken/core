import { Component, ComponentFactoryResolver} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AppService, AuthModalComponent, NavbarComponent,
  AccountService, ConfirmModalComponent
} from './../../../../../../src';
import { TranslateService } from '@ngx-translate/core';
import { DemoRoutes } from './../../../app.routes';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class DemoNavbarComponent extends NavbarComponent {

  changelog: string = require('html-loader!markdown-loader!./../../../../../../CHANGELOG.md');

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public resolver: ComponentFactoryResolver
  ) {
    super(accountService, app, translateService, activatedRoute, router, resolver);
  }
  init() {
    super.init();
    this.childrenRoutes = DemoRoutes;
  }
}
