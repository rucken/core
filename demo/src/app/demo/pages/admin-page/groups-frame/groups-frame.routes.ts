import { Routes } from '@angular/router';
import { GroupsFrameComponent } from 'rucken';
import { translate } from 'rucken';

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
