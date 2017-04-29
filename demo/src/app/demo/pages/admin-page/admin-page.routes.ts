import { Routes } from '@angular/router';
import { AdminPageComponent } from '../../../../../../dist';

export const AdminPageRoutes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
      {
        path: 'users',
        data: ['Users'],
        loadChildren: './users-frame/users-frame.module#DemoUsersFrameModule'
      },
      {
        path: 'groups',
        data: ['Groups'],
        loadChildren: './groups-frame/groups-frame.module#DemoGroupsFrameModule'
      }
    ]
  }
];
