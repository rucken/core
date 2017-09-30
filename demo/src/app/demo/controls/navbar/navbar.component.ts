import { Component, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthModalComponent, NavbarComponent,
  ConfirmModalComponent
} from '@rucken/web';
import { TranslateService } from '@ngx-translate/core';
import { DemoRoutes } from './../../../app.routes';
import { SharedService, AccountService, AppService } from '@rucken/core';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class DemoNavbarComponent extends NavbarComponent {

  changelog = require('html-loader!markdown-loader!./../../../../../../CHANGELOG.md');

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public resolver: ComponentFactoryResolver,
    public sharedService: SharedService
  ) {
    super(accountService, app, translateService, activatedRoute, router, resolver, sharedService);
  }
  init() {
    super.init();
    this.childrenRoutes = DemoRoutes;
  }
  get version() {
    return this.app.version;
  }
}
