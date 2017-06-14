import { Routes } from '@angular/router';
import { ControlsFrameComponent } from './controls-frame.component';
import { translate } from './../../../shared/utils';

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
