import { Component, Input } from '@angular/core';
import { AccountService } from '@rucken/core';
import { User } from '@rucken/core';
import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})

export class PageHeaderComponent extends BaseComponent {
  @Input()
  title: string;

  constructor(public accountService: AccountService) {
    super();
  }

  get account(): any | User {
    return this.accountService.account;
  }
}
