import { MetaGuard } from '@ngx-meta/core';
import { PermissionsGuard, translate } from '@rucken/core';
import { ADMIN_PAGE_CHILDREN_ROUTES } from './admin-page.children-routes';
import { AdminPageComponent } from './admin-page.component';

export const ADMIN_PAGE_ROUTES = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    data: {
      name: 'admin',
      permissions: {
        only: 'read_admin-page',
        redirectTo: '/home'
      },
      meta: {
        title: translate('Administration'),
        description: translate('Administration page')
      }
    },
    children: ADMIN_PAGE_CHILDREN_ROUTES
  }
];
