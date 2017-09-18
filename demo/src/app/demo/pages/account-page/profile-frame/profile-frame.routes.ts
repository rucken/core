import { Routes } from '@angular/router';
import { ProfileFrameComponent } from 'rucken';
import { translate } from 'rucken';

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
