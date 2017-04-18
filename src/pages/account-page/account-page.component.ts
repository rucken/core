import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../shared/models/user.model';
import { AccountService } from '../../shared/account.service';
import { AppService } from '../../shared/app.service';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})

export class AccountPageComponent implements OnInit {
  public title: string;

  get account(): User {
    return this.accountService.account;
  }
  constructor(public router: Router, public accountService: AccountService, public app: AppService,
    public translateService: TranslateService) {
    this.title = this.translateService.instant('Account');
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.app.currentPageName = 'account';
    this.app.currentPageTitle = this.title;
  }
}
