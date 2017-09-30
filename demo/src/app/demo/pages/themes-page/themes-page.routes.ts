import { ThemesPageComponent } from '@rucken/web';
import { translate } from '@rucken/core';
export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
