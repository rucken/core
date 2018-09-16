import { translate, PermissionsGuard } from '@rucken/core';
import { ProfileFrameComponent } from './profile-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const ProfileFrameRoutes = [
  {
    path: '',
    component: ProfileFrameComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    data: {
      name: 'profile',
      permissions: {
        only: 'read_profile-frame',
        redirectTo: '/home'
      },
      meta: {
        title: translate('Profile'),
        description: translate('Profile frame')
      }
    }
  }
];
