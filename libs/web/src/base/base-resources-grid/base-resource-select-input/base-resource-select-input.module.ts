import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

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
