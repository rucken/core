import { translate } from '@rucken/core';
import { AuthGuardService, ThemesPageComponent } from '@rucken/web';

export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  },
  canActivate: [AuthGuardService]
}];
