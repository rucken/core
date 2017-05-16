import { ThemesPageComponent } from './../../../../../../dist';
import { translate } from './../../../../../../dist/shared/utils';
export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
