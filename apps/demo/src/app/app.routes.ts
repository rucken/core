import { Routes } from '@angular/router';
import { AuthEmptyPageComponent, OauthGuard } from '@rucken/core';
import { ACCOUNT_PAGE_ROUTES } from './pages/account-page/account-page.routes';
import { ADMIN_PAGE_ROUTES } from './pages/admin-page/admin-page.routes';
import { ENTITIES_PAGE_ROUTES } from './pages/entities-page/entities-page.routes';
import { HOME_PAGE_ROUTES } from './pages/home-page/home-page.routes';
import { THEMES_PAGE_ROUTES } from './pages/themes-page/themes-page.routes';

export const OAUTH_ROUTES = [
  {
    path: 'auth/facebook',
    component: AuthEmptyPageComponent,
    canActivate: [OauthGuard],
    data: {
      visible: false,
      oauth: {
        provider: 'facebook',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  },
  {
    path: 'auth/google-plus',
    component: AuthEmptyPageComponent,
    canActivate: [OauthGuard],
    data: {
      visible: false,
      oauth: {
        provider: 'google-plus',
        redirectTo: {
          ifSuccess: '/home',
          ifFail: '/home'
        }
      }
    }
  }
];
export const APP_ROUTES: Routes = [
  ...OAUTH_ROUTES,
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#HomePageModule',
    data: HOME_PAGE_ROUTES[0].data
  },
  {
    path: 'entities',
    loadChildren: './pages/entities-page/entities-page.module#EntitiesPageModule',
    data: ENTITIES_PAGE_ROUTES[0].data
  },
  {
    path: 'themes',
    loadChildren: './pages/themes-page/themes-page.module#ThemesPageModule',
    data: THEMES_PAGE_ROUTES[0].data
  },
  {
    path: 'account',
    loadChildren: './pages/account-page/account-page.module#AccountPageModule',
    data: ACCOUNT_PAGE_ROUTES[0].data
  },
  {
    path: 'admin',
    loadChildren: './pages/admin-page/admin-page.module#AdminPageModule',
    data: ADMIN_PAGE_ROUTES[0].data
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
