import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BindObservable } from 'bind-observable';
import { Observable } from 'rxjs';
import { BindIoInner } from 'ngx-bind-io';

@BindIoInner()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSidebarComponent {
  @Input()
  parentUrl = '';

  @BindObservable()
  @Input()
  allowedRoutes = [];
  allowedRoutes$: Observable<any[]>;
  @BindObservable()
  @Input()
  sidebardRoutes = [];
  sidebardRoutes$: Observable<any[]>;

  constructor(public router: Router) {}
  setRoutes(routes: any[]) {
    this.allowedRoutes = routes ? routes.filter((item: any) => item.data && item.data.visible !== false) : [];
    this.sidebardRoutes = this.allowedRoutes
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
      });
  }
}
