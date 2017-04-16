import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './../../shared/account.service';
import { AppService } from '../../shared/app.service';
import { User } from '../../shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit {

  public title: string;

  get account(): User {
    return this.accountService.account;
  }
  constructor(public router: Router, public accountService: AccountService, public app: AppService,
    public translateService: TranslateService) {
    this.title = this.translateService.instant('Admin');
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.app.currentPageName = 'admin';
    this.app.currentPageTitle = this.title;
  }
}
