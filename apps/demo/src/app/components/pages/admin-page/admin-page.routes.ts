import { translate, PermissionsGuard } from '@rucken/core';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';
import { AdminPageComponent } from './admin-page.component';

export const AdminPageRoutes = [{
  path: '',
  component: AdminPageComponent,
  canActivate: [PermissionsGuard],
  data: {
    name: 'admin',
    title: translate('Administration'),
    permissions: {
      only: 'read_admin-page',
      redirectTo: '/home'
    }
  },
  children: AdminPageChildrenRoutes
}];
