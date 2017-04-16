import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import {
  AdminPageComponent, AppService, AuthModalComponent, NavbarComponent,
  AccountService, User, ConfirmModalComponent
} from '../../../../../../dist';
import { TranslateService } from '@ngx-translate/core';

let changelog = require('html-loader!markdown-loader!./../../../../../../CHANGELOG.md');

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class DemoNavbarComponent extends NavbarComponent {

  public changelog: string = changelog;

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public router: Router,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(app, accountService, router, resolver, translateService);
  }
  //todo: remove update rucken
  init() {
    this.accountService.info();
    if (this.app.localVersion !== this.app.currentVersion) {
      this.showChangeLog();
      this.app.localVersion = this.app.currentVersion;
    }
  }
}
