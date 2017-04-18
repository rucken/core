import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AccountService } from '../../shared/account.service';
import { User } from '../../shared/models/user.model';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AppService } from '../../shared/app.service';
import { AuthModalComponent } from '../../modals/auth-modal/auth-modal.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class NavbarComponent implements OnInit {

  public isCollapsed: boolean = true;
  public changelog: string = '';//require('html-loader!markdown-loader!./../../../CHANGELOG.md');
  constructor(
    public app: AppService,
    public accountService: AccountService,
    public router: Router,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
  }
  ngOnInit() {
    this.init();
  }
  showChangeLog() {
    if (this.changelog) {
      this.app.component.showContentModal(
        this.changelog,
        this.translateService.instant('Change log')
      );
    }
  }
  init() {
    this.accountService.info();
    if (this.app.localVersion !== this.app.currentVersion) {
      this.showChangeLog();
      this.app.localVersion = this.app.currentVersion;
    }
  }
  get version() {
    return this.app.version;
  }
  go(commands: any[]) {
    this.isCollapsed = true;
    this.router.navigate(commands);
  }
  get account(): User {
    return this.accountService.account;
  }
  showLogoutModal() {
    if (this.app.modals(this.resolver).exists('loginModal') || this.app.modals(this.resolver).exists('logoutModal')) {
      return;
    }
    this.isCollapsed = true;
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent, 'logoutModal');
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
    if (this.app.modals(this.resolver).exists('loginModal') || this.app.modals(this.resolver).exists('logoutModal')) {
      return;
    }
    this.isCollapsed = true;
    let itemModal: AuthModalComponent = this.app.modals(this.resolver).create(AuthModalComponent, 'loginModal');
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
