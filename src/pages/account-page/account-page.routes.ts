import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page.component';
import { ProfileFrameRoutes } from './profile-frame/profile-frame.routes';
import { translate } from '../../shared/utils';

export const AccountPageRoutes: Routes = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: '',
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true
    },
    children: [
      {
        path: 'profile',
        loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule',
        data: ProfileFrameRoutes[0].data
      }
    ]
  }
];
