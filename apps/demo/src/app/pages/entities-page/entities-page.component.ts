import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntitiesPageChildrenRoutes } from './entities-page.children-routes';

@Component({
  selector: 'entities-page',
  templateUrl: './entities-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesPageComponent {
  public routes = EntitiesPageChildrenRoutes;
  constructor(public activatedRoute: ActivatedRoute) {}
}
