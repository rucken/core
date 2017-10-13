import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseResourceModalComponent } from './base-resource-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourceModalComponent],
  exports: [BaseResourceModalComponent],
  entryComponents: [BaseResourceModalComponent]
})
export class BaseResourceModalComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourceModalComponentModule,
      providers: []
    };
  }
}
