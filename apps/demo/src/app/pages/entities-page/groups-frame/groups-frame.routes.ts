import { translate } from '@rucken/core';
import { GroupsFrameComponent } from './groups-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const GROUPS_FRAME_ROUTES = [
  {
    path: '',
    component: GroupsFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'groups',
      meta: {
        title: translate('Groups'),
        description: translate('Groups frame')
      }
    }
  }
];
