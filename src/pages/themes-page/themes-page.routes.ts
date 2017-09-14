import { ThemesPageComponent } from './themes-page.component';
import { translate } from './../../shared/utils/utils';
export const ThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
