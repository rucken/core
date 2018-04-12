import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { GroupsFrameComponent } from './groups-frame.component';

export const GroupsFrameRoutes = [{
  path: '',
  component: GroupsFrameComponent,
  canActivate: [NgxPermissionsGuard],
  data: {
    name: 'groups',
    title: translate('Groups'),
    permissions: {
      only: 'read_groups-frame'
    }
  }
}];
