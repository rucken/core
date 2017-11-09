import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BaseResourcesListComponent } from './base-resources-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseResourcesListComponent],
  exports: [BaseResourcesListComponent],
  entryComponents: [BaseResourcesListComponent]
})
export class BaseResourcesListModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseResourcesListModule,
      providers: []
    };
  }
}
