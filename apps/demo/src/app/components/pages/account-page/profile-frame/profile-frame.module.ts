import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageModalModule, PipesModule, ProfilePanelModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../../shared/shared.module';
import { ProfileFrameComponent } from './profile-frame.component';
import { ProfileFrameRoutes } from './profile-frame.routes';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ProfilePanelModule.forRoot(),
    MessageModalModule.forRoot(),
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(ProfileFrameRoutes),
    PipesModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ProfileFrameComponent
  ]
})
export class ProfileFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileFrameModule,
      providers: []
    };
  }
}
