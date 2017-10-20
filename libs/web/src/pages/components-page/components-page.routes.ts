import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { AuthGuardService } from '../../guards/auth-guard.service';
import { ComponentsPageComponent } from './components-page.component';
import { ControlsFrameRoutes } from './controls-frame/controls-frame.routes';

const children = [
  { path: '', redirectTo: '/controls', pathMatch: 'full' },
  {
    path: 'controls',
    loadChildren: './controls-frame/controls-frame.module#ControlsFrameModule',
    data: ControlsFrameRoutes[0].data,
    canActivate: [AuthGuardService]
  }
];
export const ComponentsPageRoutes: Routes = [
  {
    component: ComponentsPageComponent,
    data: {
      name: 'components',
      title: translate('Components'),
      visible: true,
      children: children
    },
    children: children,
    canActivate: [AuthGuardService]
  }
];
