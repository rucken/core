import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileFrameComponent } from './profile-frame.component';

export const ProfileFrameRoutes = [{
  path: '',
  component: ProfileFrameComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    name: 'profile',
    title: translate('Profile'),
    permissions: {
      only: 'read_profile-frame'
    }
  }
}];
