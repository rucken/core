import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

export const AdminPageRoutes: Routes = [{
  path: '', component: AdminPageComponent,
  children: [
    {
      path: 'groups',
      data: ['Groups'],
      loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule'
    },
    {
      path: 'users',
      data: ['Users'],
      loadChildren: './users-frame/users-frame.module#UsersFrameModule'
    }
  ]
}
];
