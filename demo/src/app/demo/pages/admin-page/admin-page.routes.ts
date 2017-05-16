import { Routes } from '@angular/router';
import { AdminPageComponent } from './../../../../../../dist';
import { DemoGroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { DemoUsersFrameRoutes } from './users-frame/users-frame.routes';
import { translate } from './../../../../../../dist/shared/utils';

const children = [
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
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
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
