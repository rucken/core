import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AccountPageChildrenRoutes } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';

export const AccountPageRoutes = [{
  path: '',
  component: AccountPageComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    name: 'account',
    title: translate('Account'),
    permissions: {
      only: 'read_account-page'
    }
  },
  children: AccountPageChildrenRoutes
}];
