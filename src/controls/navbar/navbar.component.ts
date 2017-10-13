import { Component, ComponentFactoryResolver } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@rucken/core';
import { AccountService } from '@rucken/core';
import { AppService } from '@rucken/core';

import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { SharedService } from '../../shared/services/shared.service';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { AuthModalComponent } from './../../modals/auth-modal/auth-modal.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class NavbarComponent extends BaseComponent {

  isCollapsed = true;
  languagesIsCollapsed = true;
  changelog = ''; // require('html-loader!markdown-loader!./../../../CHANGELOG.md');

  private _childrenRoutes: any[] = [];

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public resolver: ComponentFactoryResolver,
    public sharedService: SharedService
  ) {
    super();
  }
  afterCreate() {
    this.sharedService.linkTranslateService();
    this.router.events
      .map(event => event instanceof NavigationStart)
      .subscribe(() => {
        this.isCollapsed = true;
      });
    this.accountService.account$.subscribe((user: any | User) => {
      this.init();
    });
    this.accountInfo();
  }
  get languages() {
    return this.app.component.languages;
  }
  get currentLanguage() {
    return this.app.component.currentLanguage;
  }
  set currentLanguage(lang: string) {
    this.languagesIsCollapsed = true;
    this.isCollapsed = true;
    this.app.component.currentLanguage = lang;
  }
  get version() {
    return `${this.translateService.instant('Version')}: ${this.app.currentVersion}`;
  }
  get account(): any | User {
    return this.accountService.account;
  }
  set childrenRoutes(routes: any[]) {
    this._childrenRoutes = routes;
  }
  get childrenRoutes() {
    const items: any[] = this._childrenRoutes.filter(
      item =>
        item.data &&
        item.data.visible &&
        this.account &&
        this.account.checkPermissions([`read_${item.data.name}-page`])
    ).map(
      item => {
        const newItem = item.data;
        newItem.url = `/${newItem.name}`;
        return newItem;
      });
    return items;
  }
  showChangeLog() {
    if (this.changelog) {
      this.app.component.showContentModal(
        this.changelog,
        this.translateService.instant('Change log'),
        'lg'
      );
    }
  }
  init() {
    super.init();
    if (this.app.localVersion !== this.app.currentVersion) {
      this.showChangeLog();
      this.app.localVersion = this.app.currentVersion;
    }
  }
  accountInfo() {
    this.accountService.info();
  }
  go(commands: any[]) {
    this.isCollapsed = true;
    this.router.navigate(commands);
  }
  showLogoutModal() {
    if (this.app.modals(this.resolver).exists('login') || this.app.modals(this.resolver).exists('logout')) {
      return;
    }
    this.isCollapsed = true;
    const confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent, 'logout');
    confirm.name = 'logout';
    confirm.title = this.translateService.instant('Logout');
    confirm.message = this.translateService.instant('Do you really want to leave?');
    confirm.onOk.subscribe(($event: any) => this.logout($event));
    confirm.modal.show();
    this.accountService.changeStatus$.subscribe(status =>
      confirm.okInProcessFromStatus(status)
    );
  }
  logout(itemModal: ConfirmModalComponent) {
    this.accountService.logout().subscribe(
      () => {
        itemModal.modal.hide();
        this.go(['/']);
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', '));
        }
      }
    );
  }
  showLoginModal() {
    if (this.app.modals(this.resolver).exists('login') || this.app.modals(this.resolver).exists('logout')) {
      return;
    }
    this.isCollapsed = true;
    const itemModal: AuthModalComponent = this.app.modals(this.resolver).create(AuthModalComponent, 'login');
    itemModal.title = this.translateService.instant('Authorization');
    itemModal.onOk.subscribe(($event: any) => this.login($event));
    itemModal.modal.show();
    this.accountService.changeStatus$.subscribe(status =>
      itemModal.okInProcessFromStatus(status)
    );
  }
  login(itemModal: AuthModalComponent) {
    this.accountService.login(itemModal.account).subscribe(
      (account: any | User) => {
        itemModal.modal.hide();
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              itemModal.account.username = '';
              itemModal.account.password = '';
              itemModal.focus();
            });
        } else {
          itemModal.errors.emit(errors);
        }
      }
    );
  }
}
