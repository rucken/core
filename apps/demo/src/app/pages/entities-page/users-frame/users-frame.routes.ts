import { translate } from '@rucken/core';
import { UsersFrameComponent } from './users-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const USERS_FRAME_ROUTES = [
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
