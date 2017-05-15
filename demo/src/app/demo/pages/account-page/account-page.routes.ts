import { Routes } from '@angular/router';
import { AccountPageComponent } from './../../../../../../dist';
import { DemoProfileFrameRoutes } from './profile-frame/profile-frame.routes';

const children = [
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#DemoProfileFrameModule',
    data: DemoProfileFrameRoutes[0].data
  }
];
export const DemoAccountPageRoutes: Routes = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: '',
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: 'Account',
      visible: true,
      children: children
    },
    children: children
  }
];
