import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlsFrameModule } from '@rucken/web';

import { DemoControlsFrameRoutes } from './controls-frame.routes';

@NgModule({
  imports: [
    ControlsFrameModule.forRoot(),
    RouterModule.forChild(DemoControlsFrameRoutes)
  ]
})
export class DemoControlsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoControlsFrameModule,
      providers: []
    };
  }
}
