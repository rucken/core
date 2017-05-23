import { Routes } from '@angular/router';
import { GroupsFrameComponent } from './../../../../../../../src';
import { translate } from './../../../../../../../src';

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
