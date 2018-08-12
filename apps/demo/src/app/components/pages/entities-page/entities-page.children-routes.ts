import { ContentTypesFrameRoutes } from './content-types-frame/content-types-frame.routes';
import { GroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { PermissionsFrameRoutes } from './permissions-frame/permissions-frame.routes';
import { UsersFrameRoutes } from './users-frame/users-frame.routes';

export const EntitiesPageChildrenRoutes = [
  { path: '', redirectTo: '/entities/content-types', pathMatch: 'full' },
  {
    path: 'content-types',
    loadChildren:
      './content-types-frame/content-types-frame.module#ContentTypesFrameModule',
    data: ContentTypesFrameRoutes[0].data
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule',
    data: GroupsFrameRoutes[0].data
  },
  {
    path: 'permissions',
    loadChildren:
      './permissions-frame/permissions-frame.module#PermissionsFrameModule',
    data: PermissionsFrameRoutes[0].data
  },
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#UsersFrameModule',
    data: UsersFrameRoutes[0].data
  }
];
