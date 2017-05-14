import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './../../../shared/account.service';
import { AppService } from './../../../shared/app.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'users-frame',
  templateUrl: './users-frame.component.html',
  styleUrls: ['./users-frame.component.scss']
})

export class UsersFrameComponent implements OnInit {
  title: string;

  constructor(
    public accountService: AccountService,
    public app: AppService,
    public translateService: TranslateService
  ) {
  }
  get account(): any | User {
    return this.accountService.account;
  }
  ngOnInit() {
    this.title = `${this.translateService.instant(this.app.currentPageTitle)}: ${this.translateService.instant('Users')}`;
  }
}
