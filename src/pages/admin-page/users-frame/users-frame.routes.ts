import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { UsersFrameComponent } from './users-frame.component';

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
