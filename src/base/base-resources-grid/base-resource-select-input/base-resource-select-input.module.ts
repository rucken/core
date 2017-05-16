import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseResourceSelectInputComponent } from './base-resource-select-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourceSelectInputComponent],
  exports: [BaseResourceSelectInputComponent],
  entryComponents: [BaseResourceSelectInputComponent]
})
export class BaseResourceSelectInputComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourceSelectInputComponentModule,
      providers: []
    };
  }
}
