import { Routes } from '@angular/router';
import { DemoHomePageRoutes } from './demo/pages/home-page/home-page.routes';
import { DemoThemesPageRoutes } from './demo/pages/themes-page/themes-page.routes';
import { DemoAdminPageRoutes } from './demo/pages/admin-page/admin-page.routes';
import { DemoAccountPageRoutes } from './demo/pages/account-page/account-page.routes';

export const DemoRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './demo/pages/home-page/home-page.module#HomePageModule',
    data: DemoHomePageRoutes[0].data
  },
  {
    path: 'themes',
    loadChildren: './demo/pages/themes-page/themes-page.module#DemoThemesPageModule',
    data: DemoThemesPageRoutes[0].data
  },
  {
    path: 'admin',
    loadChildren: './demo/pages/admin-page/admin-page.module#DemoAdminPageModule',
    data: DemoAdminPageRoutes[1].data
  },
  {
    path: 'account',
    loadChildren: './demo/pages/account-page/account-page.module#DemoAccountPageModule',
    data: DemoAccountPageRoutes[1].data
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
