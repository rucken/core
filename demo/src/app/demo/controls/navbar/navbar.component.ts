import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AdminPageComponent, AppService, AuthModalComponent, NavbarComponent,
  AccountService, User, ConfirmModalComponent
} from '../../../../../../src';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})

export class DemoNavbarComponent extends NavbarComponent {

  constructor(
    public app: AppService,
    public accountService: AccountService,
    public router: Router,
    public resolver: ComponentFactoryResolver,
    public translateService: TranslateService
  ) {
    super(app, accountService, router, resolver, translateService);
  }

  ngOnInit() {
    this.init();
  }
  init(){
    this.accountService.info();
  }

  get account(): User {
    return this.accountService.account;
  }

  showLogoutModal() {
    if (this.app.modals(this.resolver).exists('loginModal') || this.app.modals(this.resolver).exists('logoutModal')) {
      return;
    }
    let confirm: ConfirmModalComponent = this.app.modals(this.resolver).create(ConfirmModalComponent, 'logoutModal');
    confirm.title = this.translateService.instant('Logout');
    confirm.message = this.translateService.instant('Do you really want to leave?');
    confirm.onYes.subscribe(($event:any) => this.logout($event));
    confirm.modal.show();
  }

  logout(itemModal: ConfirmModalComponent) {
    this.accountService.logout().subscribe(
      () => {
        itemModal.modal.hide();
        this.router.navigate(['/']);
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
    let itemModal: AuthModalComponent = this.app.modals(this.resolver).create(AuthModalComponent, 'loginModal');
    itemModal.title = this.translateService.instant('Authorization');
    itemModal.onLogin.subscribe(($event:any) => this.login($event));
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
