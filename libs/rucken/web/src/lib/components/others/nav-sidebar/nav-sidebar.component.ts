import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSidebarComponent {
  @Input()
  parentUrl = '';
  @Input()
  set routes(routes: any[]) {
    this.allowedRoutes$.next(
      routes
        ? routes.filter((item: any) => item.data && item.data.visible !== false)
        : []
    );
    this.sidebardRoutes$.next(
      this.allowedRoutes$
        .getValue()
        .filter((item: any) => item.data)
        .map((item: any) => {
          let newItem = item.data;
          if (newItem.meta) {
            newItem = { ...newItem, ...newItem.meta };
          }
          if (item.path) {
            newItem.path = item.path;
          }
          newItem.url = `/${newItem.path}`;
          newItem.redirectTo = item.redirectTo;
          return newItem;
        })
    );
  }

  public allowedRoutes$ = new BehaviorSubject([]);
  public sidebardRoutes$ = new BehaviorSubject([]);

  constructor(public router: Router) {}
}
