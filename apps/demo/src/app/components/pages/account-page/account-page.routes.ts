import { translate, PermissionsGuard } from '@rucken/core';
import { AccountPageChildrenRoutes } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';

export const AccountPageRoutes = [{
  path: '',
  component: AccountPageComponent,
  canActivate: [PermissionsGuard],
  data: {
    name: 'account',
    title: translate('Account'),
    permissions: {
      only: 'read_account-page',
      redirectTo: '/home'
    }
  },
  children: AccountPageChildrenRoutes
}];
