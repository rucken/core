import { translate, PermissionsGuard } from '@rucken/core';
import { UsersFrameComponent } from './users-frame.component';

export const UsersFrameRoutes = [{
  path: '',
  component: UsersFrameComponent,
  canActivate: [PermissionsGuard],
  data: {
    name: 'users',
    title: translate('Users'),
    permissions: {
      only: 'read_users-frame',
      redirectTo: '/home'
    }
  }
}];
