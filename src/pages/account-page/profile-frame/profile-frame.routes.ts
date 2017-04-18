import { Routes } from '@angular/router';
import { ProfileFrameComponent } from './profile-frame.component';

export const ProfileFrameRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileFrameComponent
  }
];
