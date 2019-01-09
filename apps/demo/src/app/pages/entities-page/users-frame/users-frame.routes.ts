import { translate } from '@rucken/core';
import { UsersFrameComponent } from './users-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const UsersFrameRoutes = [
  {
    path: '',
    component: UsersFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'users',
      meta: {
        title: translate('Users'),
        description: translate('Users frame')
      }
    }
  }
];
