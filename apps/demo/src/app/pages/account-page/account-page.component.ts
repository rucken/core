import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavSidebarComponent } from '@rucken/web';
import { ACCOUNT_PAGE_CHILDREN_ROUTES } from './account-page.children-routes';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar: NavSidebarComponent;
  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.sidebar.setRoutes(ACCOUNT_PAGE_CHILDREN_ROUTES);
  }
}
