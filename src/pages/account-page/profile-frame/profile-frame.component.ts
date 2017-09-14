import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../../shared/models/user.model';
import { AccountService } from './../../../shared/services/account.service';
import { AppService } from './../../../shared/services/app.service';
import { BaseFrameComponent } from './../../../base/base-page/base-frame/base-frame.component';
import { AccountProfileFormComponent } from '../../../grids/users-grid/account-profile-form/account-profile-form.component';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html',
  styleUrls: ['./profile-frame.component.scss']
})
export class ProfileFrameComponent extends BaseFrameComponent {

  @ViewChild('accountProfileForm')
  accountProfileForm: AccountProfileFormComponent;

  modelMeta: any = User.meta();
  rePassword: string;

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(accountService, app, translateService, activatedRoute, router);
  }
  init() {
    super.init();
    this.accountService.changeStatus$.subscribe(status =>
      this.accountProfileForm ? this.accountProfileForm.okInProcessFromStatus(status) : false
    );
  }
  get readonly() {
    return !this.account || !this.account.checkPermissions(['change_profile']);
  }
  update(account: any | User) {
    this.accountService.update(account).subscribe(
      (user: any | User) => {
        this.accountService.account = user;
      },
      (errors: any) => {
        if (errors.message) {
          this.app.component.showErrorModal(errors.message.join(', ')).subscribe(
            () => {
              this.info.emit({ username: '' });
            });
        } else {
          this.errors.emit(errors);
        }
      }
    );
  }
  cancel() {
    history.back();
  }
}
