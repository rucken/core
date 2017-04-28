import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileFrameRoutes } from './profile-frame.routes';
import { ProfileFrameModule } from '../../../../../../../src';

@NgModule({
  imports: [
    ProfileFrameModule.forRoot(),
    RouterModule.forChild(ProfileFrameRoutes)
  ]
})
export class DemoProfileFrameModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoProfileFrameModule,
      providers: []
    };
  }
}
