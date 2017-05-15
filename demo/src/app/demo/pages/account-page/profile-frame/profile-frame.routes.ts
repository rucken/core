import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './../../../../../../../dist';

export const DemoProfileFrameRoutes: Routes = [
  {
    path: '',
    component: ProfileFrameComponent,
    data: {
      name: 'profile',
      title: 'Profile',
      visible: true
    }
  }
];
