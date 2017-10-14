import { translate } from '@rucken/core';

import { HomeGuardService } from '../../guards/home-guard.service';
import { HomePageComponent } from './home-page.component';

export const HomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  },
  canActivate: [HomeGuardService]
}];
