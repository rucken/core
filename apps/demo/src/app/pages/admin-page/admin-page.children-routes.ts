import { GroupsFrameRoutes } from '../entities-page/groups-frame/groups-frame.routes';
import { UsersFrameRoutes } from '../entities-page/users-frame/users-frame.routes';

export const AdminPageChildrenRoutes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren:
      '../entities-page/users-frame/users-frame.module#UsersFrameModule',
    data: UsersFrameRoutes[0].data
  },
  {
    path: 'groups',
    loadChildren:
      '../entities-page/groups-frame/groups-frame.module#GroupsFrameModule',
    data: GroupsFrameRoutes[0].data
  }
];
