import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page.component';
import { ProfileFrameRoutes } from './profile-frame/profile-frame.routes';
import { translate } from '@rucken/core';

const children = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule',
    data: ProfileFrameRoutes[0].data
  }
];
export const AccountPageRoutes: Routes = [
  {
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true
    },
    children: children
  }
];
