import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { AdminPageComponent } from './admin-page.component';
import { GroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { UsersFrameRoutes } from './users-frame/users-frame.routes';

const children = [
  { path: '', redirectTo: '/admin/groups', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#UsersFrameModule',
    data: UsersFrameRoutes[0].data
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule',
    data: GroupsFrameRoutes[0].data
  }
];
export const AdminPageRoutes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: {
      name: 'admin',
      title: translate('Admin'),
      visible: true
    },
    children: children
  }
];
