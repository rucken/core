import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from './../../shared/account.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})

export class PageHeaderComponent implements OnInit {
  @Input()
  public title: string;

  constructor(public accountService: AccountService) { }

  ngOnInit() { }

  get account(): User {
    return this.accountService.account;
  }
}
