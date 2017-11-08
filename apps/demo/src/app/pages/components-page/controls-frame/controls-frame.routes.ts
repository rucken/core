import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { ControlsFrameComponent } from '@rucken/web';
import { AuthGuardService } from '@rucken/web';

export const DemoControlsFrameRoutes: Routes = [
  {
    path: '',
    component: ControlsFrameComponent,
    data: {
      name: 'controls',
      title: translate('Controls'),
      visible: true
    },
    canActivate: [AuthGuardService]
  }
];
