import { ThemesPageComponent } from './../../../../../../dist';
import { translate } from './../../../../../../dist';
export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
