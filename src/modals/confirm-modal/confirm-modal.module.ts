import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@rucken/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterButtonsModule } from './../../controls/footer-buttons/footer-buttons.module';
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  imports: [
    FormsModule, ModalModule.forRoot(), SharedModule.forRoot(),
    FooterButtonsModule.forRoot()
  ],
  declarations: [ConfirmModalComponent],
  exports: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class ConfirmModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfirmModalModule,
      providers: []
    };
  }
}
