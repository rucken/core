import { DemoHomePageComponent } from './home-page.component';
import { translate } from 'rucken';

export const DemoHomePageRoutes = [{
  path: '',
  component: DemoHomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  }
}];
