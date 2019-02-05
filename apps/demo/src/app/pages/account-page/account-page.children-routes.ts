import { PROFILE_FRAME_ROUTES } from './profile-frame/profile-frame.routes';

export const ACCOUNT_PAGE_CHILDREN_ROUTES = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule',
    data: PROFILE_FRAME_ROUTES[0].data
  }
];
