import { translate } from '@rucken/core';
import { PermissionsFrameComponent } from './permissions-frame.component';

export const PermissionsFrameRoutes = [{
  path: '',
  component: PermissionsFrameComponent,
  data: {
    name: 'permissions',
    title: translate('Permissions')
  }
}];
