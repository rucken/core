import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page.component';

export const AccountPageRoutes: Routes = [
  {
    path: '', component: AccountPageComponent,
    children: [
      {
        path: 'profile',
        data: ['Profile'],
        loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule'
      }
    ]
  }
];
