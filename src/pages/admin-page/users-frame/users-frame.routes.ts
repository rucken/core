import { Routes } from '@angular/router';
import { UsersFrameComponent } from './users-frame.component';

export const UsersFrameRoutes: Routes = [
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
