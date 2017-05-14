import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ModalFooterButtonsModule } from './../../controls/modal-footer-buttons/modal-footer-buttons.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, ModalModule.forRoot(), TranslateModule.forChild(),
    ModalFooterButtonsModule.forRoot()
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
