import { translate } from '@rucken/core';
import { ThemesPageComponent } from './themes-page.component';
import { MetaGuard } from '@ngx-meta/core';

export const THEMES_PAGE_ROUTES = [
  {
    path: '',
    component: ThemesPageComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'themes',
      meta: {
        title: translate('Themes'),
        description: translate('Themes page')
      }
    }
  }
];
