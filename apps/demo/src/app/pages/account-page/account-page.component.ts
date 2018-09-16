import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountPageChildrenRoutes } from './account-page.children-routes';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPageComponent {
  public routes = AccountPageChildrenRoutes;
  constructor(public activatedRoute: ActivatedRoute) {}
}
