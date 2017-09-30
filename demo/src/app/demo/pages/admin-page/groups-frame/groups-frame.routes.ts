import { Routes } from '@angular/router';
import { GroupsFrameComponent } from '@rucken/web';
import { translate } from '@rucken/core';

export const DemoGroupsFrameRoutes: Routes = [
  {
    path: '',
    component: GroupsFrameComponent,
    data: {
      name: 'groups',
      title: translate('Groups'),
      visible: true
    }
  }
];
