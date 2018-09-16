import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {
  public routes = AdminPageChildrenRoutes;
  constructor(public activatedRoute: ActivatedRoute) {}
}
