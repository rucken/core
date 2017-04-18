import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/models/user.model';
import { AccountService } from '../../../shared/account.service';
import { AppService } from '../../../shared/app.service';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html',
  styleUrls: ['./profile-frame.component.scss']
})
export class ProfileFrameComponent implements OnInit {
  public title: string;
  public modelMeta: any = User.meta();
  public rePassword: string;

  public errors: EventEmitter<any> = new EventEmitter();
  public info: EventEmitter<any> = new EventEmitter();

  constructor(public accountService: AccountService, public app: AppService,
    public translateService: TranslateService,
    public location: Location) {
  }

  ngOnInit() {
    this.title = `${this.translateService.instant(this.app.currentPageTitle)}: ${this.translateService.instant('Profile')}`;
  }
  get readonly() {
    return !this.account || !this.account.checkPermissions(['change_profile']);
  }
  get account(): User {
    return this.accountService.account;
  }
  set account(val) {
    this.accountService.account = val;
  }
  update(account: User) {
    this.accountService.update(account).subscribe(
      (user: User) => {
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
