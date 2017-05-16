import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { UsersFrameRoutes } from './users-frame/users-frame.routes';
import { GroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { translate } from './../../shared/utils';

export const AdminPageRoutes: Routes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: '',
    component: AdminPageComponent,
    data: {
      name: 'admin',
      title: translate('Admin'),
      visible: true
    },
    children: [
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
    ]
  }
];
