import { translate } from '@rucken/core';
import { EntitiesPageChildrenRoutes } from './entities-page.children-routes';
import { EntitiesPageComponent } from './entities-page.component';
import { MetaGuard } from '@ngx-meta/core';

export const EntitiesPageRoutes = [
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
    children: EntitiesPageChildrenRoutes
  }
];
