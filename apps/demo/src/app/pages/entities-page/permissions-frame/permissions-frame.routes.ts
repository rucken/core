import { translate } from '@rucken/core';
import { PermissionsFrameComponent } from './permissions-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const PERMISSIONS_FRAME_ROUTES = [
  {
    path: '',
    component: PermissionsFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'permissions',
      meta: {
        title: translate('Permissions'),
        description: translate('Permissions frame')
      }
    }
  }
];
