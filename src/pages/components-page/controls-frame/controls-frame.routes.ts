import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { ControlsFrameComponent } from './controls-frame.component';

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
