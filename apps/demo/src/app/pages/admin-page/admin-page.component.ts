import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavSidebarComponent } from '@rucken/web';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent implements OnInit {
  @ViewChild('sidebar')
  sidebar: NavSidebarComponent;
  constructor(public activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.sidebar.setRoutes(AdminPageChildrenRoutes);
  }
}
