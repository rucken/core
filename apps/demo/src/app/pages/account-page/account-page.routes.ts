import { MetaGuard } from '@ngx-meta/core';
import { PermissionsGuard, translate } from '@rucken/core';
import { ACCOUNT_PAGE_CHILDREN_ROUTES } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';

export const ACCOUNT_PAGE_ROUTES = [
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
    children: ACCOUNT_PAGE_CHILDREN_ROUTES
  }
];
