import { HomePageComponent } from './home-page.component';
import { translate } from './../../shared/utils/utils';
export const HomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  }
}];
