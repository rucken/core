import { Routes } from '@angular/router';
import { ControlsFrameComponent } from '@rucken/web';
import { translate } from '@rucken/core';

export const DemoControlsFrameRoutes: Routes = [
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
