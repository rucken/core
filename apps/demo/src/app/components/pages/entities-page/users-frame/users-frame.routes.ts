import { translate, PermissionsGuard } from '@rucken/core';
import { UsersFrameComponent } from './users-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const UsersFrameRoutes = [
  {
    path: '',
    component: UsersFrameComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    data: {
      name: 'users',
      permissions: {
        only: 'read_users-frame',
        redirectTo: '/home'
      },
      meta: {
        title: translate('Users'),
        description: translate('Users frame')
      }
    }
  }
];
