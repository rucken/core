import { Routes } from '@angular/router';
import { GroupsFrameComponent } from './../../../../../../../dist';

export const DemoGroupsFrameRoutes: Routes = [
  {
    path: '',
    component: GroupsFrameComponent,
    data: {
      name: 'groups',
      title: 'Groups',
      visible: true
    }
  }
];
