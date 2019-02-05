import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NavSidebarComponent } from '@rucken/web';
import { ADMIN_PAGE_CHILDREN_ROUTES } from './admin-page.children-routes';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar: NavSidebarComponent;
  ngOnInit() {
    this.sidebar.setRoutes(ADMIN_PAGE_CHILDREN_ROUTES);
  }
}
