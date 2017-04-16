import { Routes } from '@angular/router';

export const DemoRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    data: ['Home'],
    loadChildren: './pages/home-page/home-page.module#HomePageModule'
  },
  {
    path: 'themes',
    data: ['Themes'],
    loadChildren: './pages/themes-page/themes-page.module#ThemesPageModule'
  }/*,
  {
    path: 'admin',
    data: ['Admin'],
    loadChildren: '../../../dist/pages/admin-page/admin-page.module#AdminPageModule'
  },
  {
    path: 'account',
    data: ['Account'],
    loadChildren: '../../../dist/pages/account-page/account-page.module#AccountPageModule'
  }*/
];
