import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

export const AdminPageRoutes: Routes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: '',
    component: AdminPageComponent
  },
  {
    path: 'users',
    data: ['Users'],
    loadChildren: './users-frame/users-frame.module#UsersFrameModule'
  },
  {
    path: 'groups',
    data: ['Groups'],
    loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule'
  }
];
