import { Routes } from '@angular/router';
import { UsersFrameComponent } from './../../../../../../../src';
import { translate } from './../../../../../../../src';

export const DemoUsersFrameRoutes: Routes = [
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
