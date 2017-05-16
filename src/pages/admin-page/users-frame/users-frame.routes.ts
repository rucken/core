import { Routes } from '@angular/router';
import { UsersFrameComponent } from './users-frame.component';
import { translate } from './../../../shared/utils';

export const UsersFrameRoutes: Routes = [
  {
    path: '',
    component: UsersFrameComponent,
    data: {
      name: 'users',
      title: translate('Users'),
      visible: true
    }
  }
];
