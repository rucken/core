import { Routes } from '@angular/router';
import { UsersFrameComponent } from './../../../../../../../dist';

export const DemoUsersFrameRoutes: Routes = [
  {
    path: '',
    component: UsersFrameComponent,
    data: {
      name: 'users',
      title: 'Users',
      visible: true
    }
  }
];
