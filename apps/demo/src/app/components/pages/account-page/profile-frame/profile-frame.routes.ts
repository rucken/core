import { translate, PermissionsGuard } from '@rucken/core';
import { ProfileFrameComponent } from './profile-frame.component';

export const ProfileFrameRoutes = [{
  path: '',
  component: ProfileFrameComponent,
  canActivate: [PermissionsGuard],
  data: {
    name: 'profile',
    title: translate('Profile'),
    permissions: {
      only: 'read_profile-frame',
      redirectTo: '/home'
    }
  }
}];
