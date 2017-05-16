import { Routes } from '@angular/router';
import { UsersFrameComponent } from './../../../../../../../dist';
import { translate } from './../../../../../../../dist/shared/utils';

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
