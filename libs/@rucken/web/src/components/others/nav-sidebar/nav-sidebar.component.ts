import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-sidebar',
  templateUrl: './nav-sidebar.component.html'
})
export class NavSidebarComponent {
  @Input()
  parentUrl = '';
  @Input()
  set routes(routes: any[]) {
    this.allowedRoutes = routes ? routes.filter(
      (item: any) =>
        item.data && item.data.visible !== false
    ) : [];
    this.sidebardRoutes = this.allowedRoutes.filter(
      (item: any) => item.data
    ).map(
      (item: any) => {
        const newItem = item.data;
        if (item.path) {
          newItem.path = item.path;
        }
        newItem.url = `/${newItem.path}`;
        newItem.redirectTo = item.redirectTo;
        return newItem;
      }
      );
  }
  allowedRoutes: any[];
  sidebardRoutes: any[];

  constructor(
    public router: Router
  ) {
  }
}
