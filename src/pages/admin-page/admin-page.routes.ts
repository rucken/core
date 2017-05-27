import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { UsersFrameRoutes } from './users-frame/users-frame.routes';
import { GroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { translate } from './../../shared/utils';

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
