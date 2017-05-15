import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './profile-frame.component';

export const ProfileFrameRoutes: Routes = [
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
