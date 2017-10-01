import { Routes } from '@angular/router';

import { AccountPageRoutes } from './../../pages/account-page/account-page.routes';
import { AdminPageRoutes } from './../../pages/admin-page/admin-page.routes';
import { HomePageRoutes } from './../../pages/home-page/home-page.routes';
import { ThemesPageRoutes } from './../../pages/themes-page/themes-page.routes';

export const BaseRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './../../pages/home-page/home-page.module#HomePageModule',
    data: HomePageRoutes[0].data
  },
  {
    path: 'themes',
    loadChildren: './../../pages/themes-page/themes-page.module#ThemesPageModule',
    data: ThemesPageRoutes[0].data
  },
  {
    path: 'admin',
    loadChildren: './../../pages/admin-page/admin-page.module#AdminPageModule',
    data: AdminPageRoutes[0].data
  },
  {
    path: 'account',
    loadChildren: './../../pages/account-page/account-page.module#AccountPageModule',
    data: AccountPageRoutes[0].data
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
