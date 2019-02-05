import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilePanelModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileFrameComponent } from './profile-frame.component';
import { PROFILE_FRAME_ROUTES } from './profile-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    ProfilePanelModule,
    RouterModule.forChild(PROFILE_FRAME_ROUTES)
  ],
  declarations: [ProfileFrameComponent]
})
export class ProfileFrameModule {}
