import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
