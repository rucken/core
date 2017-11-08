import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { GroupsFrameComponent } from './groups-frame.component';
import { AuthGuardService } from '../../../guards/auth-guard.service';

export const GroupsFrameRoutes: Routes = [
  {
    path: '',
    component: GroupsFrameComponent,
    data: {
      name: 'groups',
      title: translate('Groups'),
      visible: true
    },
    canActivate: [AuthGuardService]
  }
];
