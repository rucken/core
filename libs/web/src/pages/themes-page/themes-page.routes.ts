import { translate } from '@rucken/core';

import { AuthGuardService } from '../../guards/auth-guard.service';
import { ThemesPageComponent } from './themes-page.component';

export const ThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  },
  canActivate: [AuthGuardService]
}];
