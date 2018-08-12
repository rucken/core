import { translate, PermissionsGuard } from '@rucken/core';
import { AccountPageChildrenRoutes } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';
import { MetaGuard } from '@ngx-meta/core';

export const AccountPageRoutes = [
  {
    path: '',
    component: AccountPageComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    canActivateChild: [PermissionsGuard, MetaGuard],
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
