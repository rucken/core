import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseModalComponent],
  exports: [BaseModalComponent],
  entryComponents: [BaseModalComponent]
})
export class BaseModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseModalModule,
      providers: []
    };
  }
}
