import { Routes } from '@angular/router';
import { ComponentsPageComponent } from './components-page.component';
import { ControlsFrameRoutes } from './controls-frame/controls-frame.routes';
import { translate } from './../../shared/utils';

const children = [
  { path: '', redirectTo: '/controls', pathMatch: 'full' },
  {
    path: 'controls',
    loadChildren: './controls-frame/controls-frame.module#ControlsFrameModule',
    data: ControlsFrameRoutes[0].data
  }
];
export const ComponentsPageRoutes: Routes = [
  {
    component: ComponentsPageComponent,
    data: {
      name: 'components',
      title: translate('Components'),
      visible: true
    },
    children: children
  }
];
