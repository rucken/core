import { translate, PermissionsGuard } from '@rucken/core';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';
import { AdminPageComponent } from './admin-page.component';
import { MetaGuard } from '@ngx-meta/core';

export const AdminPageRoutes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    canActivateChild: [PermissionsGuard, MetaGuard],
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
    children: AdminPageChildrenRoutes
  }
];
