import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/models/user.model';
import { AccountService } from '../../../shared/account.service';
import { AppService } from '../../../shared/app.service';
import { BaseComponent } from '../../../base/base-component/base-component.component';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html',
  styleUrls: ['./profile-frame.component.scss']
})
export class ProfileFrameComponent extends BaseComponent {
  title: string;
  modelMeta: any = User.meta();
  rePassword: string;

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService,
    public location: Location
    ) {
    super();
  }
  init() {
    this.title = `${this.translateService.instant(this.app.currentPageTitle)}: ${this.translateService.instant('Profile')}`;
  }
  get readonly() {
    return !this.account || !this.account.checkPermissions(['change_profile']);
  }
  get account(): any | User {
    return this.accountService.account;
  }
  set account(val) {
    this.accountService.account = val;
  }
  update(account: any | User) {
    this.accountService.update(account).subscribe(
      (user: any | User) => {
        this.account = user;
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
    this.location.back();
  }
}
