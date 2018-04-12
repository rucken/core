import { translate } from '@rucken/core';
import { HomePageComponent } from './home-page.component';

export const HomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: false
  }
}];
