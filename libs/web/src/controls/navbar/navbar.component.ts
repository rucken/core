import 'rxjs/add/operator/takeUntil';

import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@rucken/core';
import { User } from '@rucken/core';
import { AccountService } from '@rucken/core';
import * as _ from 'lodash';

import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { SharedService } from '../../shared/services/shared.service';
import { BaseComponent } from './../../base/base-component/base-component.component';
import { AuthModalComponent } from './../../modals/auth-modal/auth-modal.component';

@Component({
  selector: 'navbar',// tslint:disable-line
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent extends BaseComponent {

  isCollapsed = true;
  languagesIsCollapsed = true;
  changelog = ''; // require('html-loader!markdown-loader!./../../../CHANGELOG.md');

  activatedRoute: ActivatedRoute;
  router: Router;
  resolver: ComponentFactoryResolver;

  protected _childrenRoutes: any[] = [];

  constructor(
    public injector: Injector,
    public translateService: TranslateService // todo: for correct work @biesbjerg/ngx-translate-extract
  ) {
    super(injector);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.resolver = injector.get(ComponentFactoryResolver);
  }
  afterCreate() {
    super.afterCreate();
    this.sharedService.linkTranslateService();
    this.router.events
      .map(event => event instanceof NavigationStart)
      .subscribe(() => {
        this.isCollapsed = true;
      });
    if (this.accountService) {
      this.accountService.account$.takeUntil(this.destroyed$).subscribe((account: any | User) => {
        this.initRoutes();
        this.initVersion();
      });
    }
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
  set childrenRoutes(routes: any[]) {
    this._childrenRoutes = this.sortChildrenRoutes(routes.filter(
      (item: any) =>
        item.data &&
        this.checkPermissions([`read_${item.data.name}-page`])
    ));
  }
  get childrenRoutes() {
    return this._childrenRoutes.map(
      (item: any) => {
        const newItem = item.data;
        newItem.url = `/${newItem.name}`;
        return newItem;
      });
  }
  sortChildrenRoutes(routes: any[]) {
    return _.sortBy(routes, [
      (route: any) => route.title
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
    this.initRoutes();
    this.initVersion();
  }
  initRoutes() {
    // edit in extended class
  }
  initVersion() {
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
    this.accountService.changeStatus$.takeUntil(this.destroyed$).subscribe(status =>
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
    this.accountService.changeStatus$.takeUntil(this.destroyed$).subscribe(status =>
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
