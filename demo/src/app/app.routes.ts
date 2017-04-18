import { Routes } from '@angular/router';

export const DemoRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    data: ['Home'],
    loadChildren: './demo/pages/home-page/home-page.module#HomePageModule'
  },
  {
    path: 'themes',
    data: ['Themes'],
    loadChildren: './demo/pages/themes-page/themes-page.module#DemoThemesPageModule'
  },
  {
    path: 'admin',
    data: ['Admin'],
    loadChildren: './demo/pages/admin-page/admin-page.module#DemoAdminPageModule'
  },
  {
    path: 'account',
    data: ['Account'],
    loadChildren: './demo/pages/account-page/account-page.module#DemoAccountPageModule'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
