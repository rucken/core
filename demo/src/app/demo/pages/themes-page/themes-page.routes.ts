import { translate } from '@rucken/core';
import { ThemesPageComponent } from '@rucken/web';

export const DemoThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes'),
    visible: true
  }
}];
