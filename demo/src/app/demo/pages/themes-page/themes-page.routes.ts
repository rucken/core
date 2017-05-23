import { ThemesPageComponent } from './../../../../../../src';
import { translate } from './../../../../../../src';
export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
