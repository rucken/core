import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UsersFrameComponent } from './users-frame.component';

export const UsersFrameRoutes = [{
  path: '',
  component: UsersFrameComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    name: 'users',
    title: translate('Users'),
    permissions: {
      only: 'read_users-frame'
    }
  }
}];
