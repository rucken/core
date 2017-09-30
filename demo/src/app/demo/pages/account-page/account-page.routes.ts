import { Routes } from '@angular/router';
import { AccountPageComponent } from '@rucken/web';
import { DemoProfileFrameRoutes } from './profile-frame/profile-frame.routes';
import { translate } from '@rucken/core';
import { DemoProfileFrameModule } from './profile-frame/profile-frame.module';

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
    children: children
  }
];
