import { Routes } from '@angular/router';
import { ControlsFrameComponent } from './../../../../../../../src';
import { translate } from './../../../../../../../src';

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
