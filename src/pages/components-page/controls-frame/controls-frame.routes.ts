import { Routes } from '@angular/router';
import { ControlsFrameComponent } from './controls-frame.component';
import { translate } from '@rucken/core';

export const ControlsFrameRoutes: Routes = [
  {
    path: '',
    component: ControlsFrameComponent,
    data: {
      name: 'controls',
      title: translate('Controls'),
      visible: true
    }
  }
];
