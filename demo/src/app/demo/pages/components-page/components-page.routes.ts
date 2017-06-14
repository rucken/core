import { Routes } from '@angular/router';
import { ComponentsPageComponent } from './../../../../../../src';
import { DemoControlsFrameRoutes } from './controls-frame/controls-frame.routes';
import { translate } from './../../../../../../src';

const children = [
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
