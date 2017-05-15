import { Routes } from '@angular/router';
import { GroupsFrameComponent } from './groups-frame.component';

export const GroupsFrameRoutes: Routes = [
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
