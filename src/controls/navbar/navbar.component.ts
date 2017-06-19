import { Component, ComponentFactoryResolver } from '@angular/core';
import { AccountService } from './../../shared/account.service';
import { User } from './../../shared/models/user.model';
import { ConfirmModalComponent } from './../../modals/confirm-modal/confirm-modal.component';
import { Router, NavigationStart } from '@angular/router';
import { AppService } from './../../shared/app.service';
import { AuthModalComponent } from './../../modals/auth-modal/auth-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';


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
    public resolver: ComponentFactoryResolver
  ) {
    super();
    this.accountService.account$.subscribe((user: any | User) => {
      this.init();
    });
    this.accountService.info();
    this.router.events
      .map(event => event instanceof NavigationStart)
      .subscribe(() => {
        this.isCollapsed = true;
      });
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
    return this.app.version;
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
    return _.sortBy(items, [
      (item: any) => { return item.title }
    ]);
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
    confirm.onYes.subscribe(($event: any) => this.logout($event));
    confirm.modal.show();
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
    itemModal.onLogin.subscribe(($event: any) => this.login($event));
    itemModal.modal.show();
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
