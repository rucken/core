import { translate, PermissionsGuard } from '@rucken/core';
import { GroupsFrameComponent } from './groups-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const GroupsFrameRoutes = [
  {
    path: '',
    component: GroupsFrameComponent,
    canActivate: [PermissionsGuard, MetaGuard],
    data: {
      name: 'groups',
      permissions: {
        only: 'read_groups-frame',
        redirectTo: '/home'
      },
      meta: {
        title: translate('Groups'),
        description: translate('Groups frame')
      }
    }
  }
];
