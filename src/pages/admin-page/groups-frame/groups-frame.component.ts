import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/models/user.model';
import { AccountService } from '../../../shared/account.service';
import { AppService } from '../../../shared/app.service';

@Component({
  selector: 'groups-frame',
  templateUrl: './groups-frame.component.html',
  styleUrls: ['./groups-frame.component.scss']
})

export class GroupsFrameComponent implements OnInit {
  public title: string;

  constructor(public accountService: AccountService, public app: AppService,
    public translateService: TranslateService) {
  }
  get account(): any | User {
    return this.accountService.account;
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.title = `${this.translateService.instant(this.app.currentPageTitle)}: ${this.translateService.instant('Groups')}`;
  }
}
