import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BaseModalComponent } from './base-modal.component';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot()
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
