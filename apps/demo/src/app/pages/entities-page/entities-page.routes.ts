import { translate } from '@rucken/core';
import { ENTITIES_PAGE_CHILDREN_ROUTES } from './entities-page.children-routes';
import { EntitiesPageComponent } from './entities-page.component';
import { MetaGuard } from '@ngx-meta/core';

export const ENTITIES_PAGE_ROUTES = [
  {
    path: '',
    component: EntitiesPageComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'entities',
      meta: {
        title: translate('Entities'),
        description: translate('Entities page')
      }
    },
    children: ENTITIES_PAGE_CHILDREN_ROUTES
  }
];
