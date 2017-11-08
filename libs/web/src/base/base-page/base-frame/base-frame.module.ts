import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseFrameComponent } from './base-frame.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseFrameComponent],
  exports: [BaseFrameComponent],
  entryComponents: [BaseFrameComponent]
})
export class BaseFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseFrameModule,
      providers: []
    };
  }
}
