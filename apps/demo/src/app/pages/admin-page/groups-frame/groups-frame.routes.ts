import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { GroupsFrameComponent } from '@rucken/web';
import { AuthGuardService } from '@rucken/web';

export const DemoGroupsFrameRoutes: Routes = [
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
