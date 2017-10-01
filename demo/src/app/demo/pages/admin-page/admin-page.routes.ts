import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { AdminPageComponent } from '@rucken/web';

import { DemoGroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { DemoUsersFrameRoutes } from './users-frame/users-frame.routes';

export const children = [
  { path: '', redirectTo: '/admin/groups', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#DemoUsersFrameModule',
    data: DemoUsersFrameRoutes[0].data
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#DemoGroupsFrameModule',
    data: DemoGroupsFrameRoutes[0].data
  }
];
export const DemoAdminPageRoutes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    data: {
      name: 'admin',
      title: translate('Admin'),
      visible: true,
      children: children
    },
    children: children
  }
];
