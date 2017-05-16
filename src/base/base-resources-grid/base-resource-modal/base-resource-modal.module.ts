import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
