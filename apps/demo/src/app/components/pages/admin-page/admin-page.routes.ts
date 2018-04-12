import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';
import { AdminPageComponent } from './admin-page.component';

export const AdminPageRoutes = [{
  path: '',
  component: AdminPageComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    name: 'admin',
    title: translate('Administration'),
    permissions: {
      only: 'read_admin-page'
    }
  },
  children: AdminPageChildrenRoutes
}];
