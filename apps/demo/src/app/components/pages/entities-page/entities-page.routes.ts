import { translate } from '@rucken/core';
import { EntitiesPageChildrenRoutes } from './entities-page.children-routes';
import { EntitiesPageComponent } from './entities-page.component';

export const EntitiesPageRoutes = [{
  path: '',
  component: EntitiesPageComponent,
  data: {
    name: 'entities',
    title: translate('Entities')
  },
  children: EntitiesPageChildrenRoutes
}];
