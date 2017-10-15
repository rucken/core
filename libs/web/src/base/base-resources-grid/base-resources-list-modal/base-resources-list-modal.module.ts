import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseResourceListModalComponent } from './base-resources-list-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourceListModalComponent],
  exports: [BaseResourceListModalComponent],
  entryComponents: [BaseResourceListModalComponent]
})
export class BaseResourceListModalComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourceListModalComponentModule,
      providers: []
    };
  }
}
