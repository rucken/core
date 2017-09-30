import { Routes } from '@angular/router';
import { ProfileFrameComponent } from '@rucken/web';
import { translate } from '@rucken/core';

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
