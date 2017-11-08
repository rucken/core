import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { ProfileFrameComponent } from './profile-frame.component';
import { AuthGuardService } from '../../../guards/auth-guard.service';

export const ProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: translate('Profile'),
      visible: true
    },
    canActivate: [AuthGuardService]
  }
];
