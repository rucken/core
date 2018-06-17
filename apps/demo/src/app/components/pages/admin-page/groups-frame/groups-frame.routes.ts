import { translate, PermissionsGuard } from '@rucken/core';
import { GroupsFrameComponent } from './groups-frame.component';

export const GroupsFrameRoutes = [{
  path: '',
  component: GroupsFrameComponent,
  canActivate: [PermissionsGuard],
  data: {
    name: 'groups',
    title: translate('Groups'),
    permissions: {
      only: 'read_groups-frame',
      redirectTo: '/home'
    }
  }
}];
