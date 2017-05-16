import { HomePageComponent } from './home-page.component';
import { translate } from './../../../../../../dist/shared/utils';

export const DemoHomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  }
}];
