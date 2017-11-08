import { translate } from '@rucken/core';
import { HomeGuardService } from '@rucken/web';

import { DemoHomePageComponent } from './home-page.component';

export const DemoHomePageRoutes = [{
  path: '',
  component: DemoHomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  },
  canActivate: [HomeGuardService]
}];
