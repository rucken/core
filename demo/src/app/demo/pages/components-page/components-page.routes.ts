import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { ComponentsPageComponent } from '@rucken/web';

import { DemoControlsFrameRoutes } from './controls-frame/controls-frame.routes';

export const children = [
  { path: '', redirectTo: '/components/controls', pathMatch: 'full' },
  {
    path: 'controls',
    loadChildren: './controls-frame/controls-frame.module#DemoControlsFrameModule',
    data: DemoControlsFrameRoutes[0].data
  }
];
export const DemoComponentsPageRoutes: Routes = [
  {
    path: '',
    component: ComponentsPageComponent,
    data: {
      name: 'components',
      title: translate('Components'),
      visible: true,
      children: children
    },
    children: children
  }
];
