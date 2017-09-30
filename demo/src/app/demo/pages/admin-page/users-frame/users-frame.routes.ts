import { Routes } from '@angular/router';
import { UsersFrameComponent } from '@rucken/web';
import { translate } from '@rucken/core';

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
