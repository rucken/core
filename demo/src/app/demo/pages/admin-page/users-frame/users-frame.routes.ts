import { Routes } from '@angular/router';
import { UsersFrameComponent } from 'rucken';
import { translate } from 'rucken';

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
