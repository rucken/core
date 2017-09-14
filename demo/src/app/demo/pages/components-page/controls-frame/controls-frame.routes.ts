import { Routes } from '@angular/router';
import { ControlsFrameComponent } from 'rucken';
import { translate } from 'rucken';

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
