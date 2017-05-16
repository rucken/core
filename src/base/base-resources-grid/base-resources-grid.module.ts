import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
