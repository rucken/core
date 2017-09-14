import { ThemesPageComponent } from 'rucken';
import { translate } from 'rucken';
export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
