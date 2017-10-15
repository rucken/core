import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { AccountPageComponent, AuthGuardService } from '@rucken/web';

import { DemoProfileFrameRoutes } from './profile-frame/profile-frame.routes';

export const children = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#DemoProfileFrameModule',
    data: DemoProfileFrameRoutes[0].data
  }
];
export const DemoAccountPageRoutes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true,
      children: children
    },
    children: children,
    canActivate: [AuthGuardService]
  }
];
