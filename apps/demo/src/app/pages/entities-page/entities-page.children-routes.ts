import { CONTENT_TYPES_FRAME_ROUTES } from './content-types-frame/content-types-frame.routes';
import { GROUPS_FRAME_ROUTES } from './groups-frame/groups-frame.routes';
import { PERMISSIONS_FRAME_ROUTES } from './permissions-frame/permissions-frame.routes';
import { USERS_FRAME_ROUTES } from './users-frame/users-frame.routes';

export const ENTITIES_PAGE_CHILDREN_ROUTES = [
  { path: '', redirectTo: '/entities/content-types', pathMatch: 'full' },
  {
    path: 'content-types',
    loadChildren: './content-types-frame/content-types-frame.module#ContentTypesFrameModule',
    data: CONTENT_TYPES_FRAME_ROUTES[0].data
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule',
    data: GROUPS_FRAME_ROUTES[0].data
  },
  {
    path: 'permissions',
    loadChildren: './permissions-frame/permissions-frame.module#PermissionsFrameModule',
    data: PERMISSIONS_FRAME_ROUTES[0].data
  },
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#UsersFrameModule',
    data: USERS_FRAME_ROUTES[0].data
  }
];
