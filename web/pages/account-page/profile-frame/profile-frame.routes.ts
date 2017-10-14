import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { ProfileFrameComponent } from './profile-frame.component';

export const ProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: translate('Profile'),
      visible: true
    }
  }
];
