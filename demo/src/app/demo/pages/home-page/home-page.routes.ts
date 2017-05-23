import { HomePageComponent } from './home-page.component';
import { translate } from './../../../../../../src';

export const DemoHomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  }
}];
