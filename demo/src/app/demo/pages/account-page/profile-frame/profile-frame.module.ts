import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileFrameModule } from '@rucken/web';

import { DemoProfileFrameRoutes } from './profile-frame.routes';

@NgModule({
  imports: [
    ProfileFrameModule.forRoot(),
    RouterModule.forChild(DemoProfileFrameRoutes)
  ]
})
export class DemoProfileFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoProfileFrameModule,
      providers: []
    };
  }
}
