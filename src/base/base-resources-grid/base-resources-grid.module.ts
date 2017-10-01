import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseResourcesGridComponent } from './base-resources-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourcesGridComponent],
  exports: [BaseResourcesGridComponent],
  entryComponents: [BaseResourcesGridComponent]
})
export class BaseResourcesGridComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourcesGridComponentModule,
      providers: []
    };
  }
}
