import { MetaGuard } from '@ngx-meta/core';
import { PermissionsGuard, translate } from '@rucken/core';
import { AccountPageChildrenRoutes } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';

export const AccountPageRoutes = [
  {
    path: '',
    component: AccountPageComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    data: {
      name: 'account',
      permissions: {
        only: 'read_account-page',
        redirectTo: '/home'
      },
      meta: {
        title: translate('Account'),
        description: translate('Account page')
      }
    },
    children: AccountPageChildrenRoutes
  }
];
