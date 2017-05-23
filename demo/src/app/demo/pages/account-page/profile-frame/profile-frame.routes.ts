import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './../../../../../../../src';
import { translate } from './../../../../../../../src';

export const DemoProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: translate('Profile'),
      visible: true
    }
  }
];
