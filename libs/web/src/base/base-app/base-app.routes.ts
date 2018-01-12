import { Routes } from '@angular/router';

import { AccountPageRoutes } from './../../pages/account-page/account-page.routes';
import { AdminPageRoutes } from './../../pages/admin-page/admin-page.routes';
import { HomePageRoutes } from './../../pages/home-page/home-page.routes';
import { ThemesPageRoutes } from './../../pages/themes-page/themes-page.routes';
import { HomeGuardService } from '../../guards/home-guard.service';
import { AuthGuardService } from '../../guards/auth-guard.service';

export const BaseRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    // loadChildren: './../../pages/home-page/home-page.module#HomePageModule',
    data: HomePageRoutes[0].data,
    canActivate: [HomeGuardService]
  },
  {
    path: 'themes',
    // loadChildren: './../../pages/themes-page/themes-page.module#ThemesPageModule',
    data: ThemesPageRoutes[0].data,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    // loadChildren: './../../pages/admin-page/admin-page.module#AdminPageModule',
    data: AdminPageRoutes[0].data,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    // loadChildren: './../../pages/account-page/account-page.module#AccountPageModule',
    data: AccountPageRoutes[0].data,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
