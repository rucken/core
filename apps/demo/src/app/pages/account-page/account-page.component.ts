import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavSidebarComponent } from '@rucken/web';
import { AccountPageChildrenRoutes } from './account-page.children-routes';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar: NavSidebarComponent;
  constructor(private _activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.sidebar.setRoutes(AccountPageChildrenRoutes);
  }
}
