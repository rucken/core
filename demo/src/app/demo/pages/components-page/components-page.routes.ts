import { Routes } from '@angular/router';
import { ComponentsPageComponent } from 'rucken';
import { DemoControlsFrameRoutes } from './controls-frame/controls-frame.routes';
import { translate } from 'rucken';
import { DemoControlsFrameModule } from './controls-frame/controls-frame.module';

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
