import { HomePageComponent } from './home-page.component';
import { translate } from './../../shared/utils';
export const HomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  }
}];
