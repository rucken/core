import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseResourceInputComponent } from './base-resource-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourceInputComponent],
  exports: [BaseResourceInputComponent],
  entryComponents: [BaseResourceInputComponent]
})
export class BaseResourceInputComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourceInputComponentModule,
      providers: []
    };
  }
}
