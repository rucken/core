import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoControlsFrameRoutes } from './controls-frame.routes';
import { ControlsFrameModule } from './../../../../../../../src';

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
