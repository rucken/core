import { GROUPS_FRAME_ROUTES } from '../entities-page/groups-frame/groups-frame.routes';
import { USERS_FRAME_ROUTES } from '../entities-page/users-frame/users-frame.routes';

export const ADMIN_PAGE_CHILDREN_ROUTES = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: '../entities-page/users-frame/users-frame.module#UsersFrameModule',
    data: USERS_FRAME_ROUTES[0].data
  },
  {
    path: 'groups',
    loadChildren: '../entities-page/groups-frame/groups-frame.module#GroupsFrameModule',
    data: GROUPS_FRAME_ROUTES[0].data
  }
];
